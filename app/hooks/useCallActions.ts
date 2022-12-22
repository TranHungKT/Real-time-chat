import { useEffect, useContext, useCallback } from 'react';
import {
  EventOnAddStream,
  EventOnCandidate,
  RTCSessionDescription,
  RTCIceCandidateType,
} from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { useMediaStream } from '@Hooks/useMediaStream';
import { PeerConnectionContext, WebSocketContext } from '@Providers/index';
import { callVideoActions } from '@Stores/callVideo';
import { currentGroupSelector } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userIdSelector } from '@Stores/user';

export const useCallActions = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(WebSocketContext);
  const userId = useSelector(userIdSelector);
  const currentGroup = useSelector(currentGroupSelector);

  const peerConnection = useContext(PeerConnectionContext);
  const getMediaStream = useMediaStream();

  const handleSendOfferToUser = (offer: RTCSessionDescription) => {
    socket.emit(SOCKET_EVENTS.OFFER_FOR_CALL_EVENT, {
      groupId: currentGroup?._id,
      offer: offer,
      callerId: userId,
    });
  };

  const createOfferForCalling = async () => {
    if (peerConnection) {
      const offerDescription = (await peerConnection.createOffer()) as RTCSessionDescription;
      await peerConnection.setLocalDescription(offerDescription);

      handleSendOfferToUser(offerDescription);
    }
  };

  const createCall = async () => {
    const stream = await getMediaStream(peerConnection);

    if (stream) {
      dispatch(callVideoActions.setLocalStream(stream));
    }

    await createOfferForCalling();
  };

  const handleSendIceCandidate = useCallback(
    (iceCandidate: RTCIceCandidateType) => {
      socket.emit(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, {
        groupId: currentGroup?._id,
        iceCandidate: iceCandidate,
      });
    },
    [currentGroup?._id, socket],
  );

  useEffect(() => {
    if (peerConnection) {
      peerConnection.onicecandidate = (event: EventOnCandidate) => {
        if (event.candidate) {
          handleSendIceCandidate(event.candidate);
        }
      };
      peerConnection.onaddstream = (event: EventOnAddStream) => {
        dispatch(callVideoActions.setRemoteStream(event.stream));
      };
    }
  }, [dispatch, handleSendIceCandidate, peerConnection]);

  return createCall;
};
