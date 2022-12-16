import { WebSocketContext } from 'providers';
import { PeerConnectionContext } from 'providers/CallVideoProvider';
import { useContext, useEffect, useCallback } from 'react';
import {
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCSessionDescription,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';

import { SOCKET_EVENTS } from '@Constants/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { callVideoActions } from '@Stores/callVideo';
import { useAppDispatch } from '@Stores/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const usePeerConnection = () => {
  const peerConnection = useContext(PeerConnectionContext);

  const socket = useContext(WebSocketContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'AllMessageScreen'>>();

  const dispatch = useAppDispatch();
  const handleRemoteDescription = useCallback(
    async (newDescription: RTCSessionDescriptionType) => {
      const description = new RTCSessionDescription(newDescription);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(description);
      }
    },
    [peerConnection],
  );

  const handleAddNewIceCandidate = useCallback(
    async (remoteIceCandidate: RTCIceCandidateType) => {
      try {
        if (remoteIceCandidate.candidate) {
          const candidate = new RTCIceCandidate(remoteIceCandidate);
          if (peerConnection) {
            await peerConnection.addIceCandidate(candidate);
          }
        }
      } catch (error) {
        console.log('error add ice candidate', error);
      }
    },
    [peerConnection],
  );

  useEffect(() => {
    socket.on(
      SOCKET_EVENTS.ICE_CANDIDATE_EVENT,
      (payload: { iceCandidate: RTCIceCandidateType }) => {
        if (payload.iceCandidate) {
          handleAddNewIceCandidate(payload.iceCandidate);
        }
      },
    );
    socket.on(SOCKET_EVENTS.ANSWER_FOR_CALL_EVENT, async (payload) => {
      try {
        if (payload.answer) {
          await handleRemoteDescription(payload.answer);
        }
      } catch (error) {
        console.log('error answer event', error);
      }
    });
    socket.on(
      SOCKET_EVENTS.OFFER_FOR_CALL_EVENT,
      (payload: { offer: RTCSessionDescription; groupId: string }) => {
        navigation.navigate('GettingCallScreen');

        dispatch(
          callVideoActions.setNewOfferAndGroupId({
            offer: payload.offer,
            groupId: payload.groupId,
          }),
        );
      },
    );
  }, [dispatch, handleAddNewIceCandidate, handleRemoteDescription, navigation, socket]);

  return peerConnection;
};
