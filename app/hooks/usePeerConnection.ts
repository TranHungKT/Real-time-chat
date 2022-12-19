import { useContext, useEffect, useCallback } from 'react';
import {
  EventOnCandidate,
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCSessionDescription,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { WebSocketContext, PeerConnectionContext } from '@Providers/index';
import { callVideoActions, getGroupIdOfCallSelector } from '@Stores/callVideo';
import { useAppDispatch } from '@Stores/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useRemoteDescription } from './useRemoteDescription';

export interface OfferPayload {
  offer: RTCSessionDescription;
  groupId: string;
  callerId: string;
}

export const usePeerConnection = () => {
  const peerConnection = useContext(PeerConnectionContext);
  const socket = useContext(WebSocketContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'AllMessageScreen'>>();

  const dispatch = useAppDispatch();

  const groupId = useSelector(getGroupIdOfCallSelector);

  const onHandleRemoteDescription = useRemoteDescription();
  const handleRemoteDescription = useCallback(
    async (newDescription: RTCSessionDescriptionType) => {
      onHandleRemoteDescription({ newDescription, peerConnection });
    },
    [onHandleRemoteDescription, peerConnection],
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

    socket.on(
      SOCKET_EVENTS.ANSWER_FOR_CALL_EVENT,
      async (payload: { answer: RTCSessionDescriptionType; groupId: string }) => {
        try {
          if (payload.answer) {
            await handleRemoteDescription(payload.answer);
            dispatch(callVideoActions.setGroupId({ groupId: payload.groupId }));
          }
        } catch (error) {
          console.log('error answer event', error);
        }
      },
    );

    socket.on(SOCKET_EVENTS.OFFER_FOR_CALL_EVENT, (payload: OfferPayload) => {
      navigation.navigate('GettingCallScreen');
      const { offer, callerId } = payload;
      dispatch(
        callVideoActions.setNewOfferAndGroupId({
          offer: offer,
          groupId: payload.groupId,
          callerId: callerId,
        }),
      );
    });
  }, [dispatch, handleAddNewIceCandidate, handleRemoteDescription, navigation, socket]);

  useEffect(() => {
    if (peerConnection && groupId) {
      peerConnection.onicecandidate = (event: EventOnCandidate) => {
        if (event.candidate) {
          socket.emit(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, {
            groupId: groupId,
            iceCandidate: event.candidate,
          });
        }
      };
    }
  }, [groupId, peerConnection, socket]);

  return peerConnection;
};
