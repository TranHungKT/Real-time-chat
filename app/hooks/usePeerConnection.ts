import { WebSocketContext } from 'providers';
import { PeerConnectionContext } from 'providers/CallVideoProvider';
import { useContext, useEffect, useCallback } from 'react';
import { RTCIceCandidate, RTCIceCandidateType } from 'react-native-webrtc';

import { SOCKET_EVENTS } from '@Constants/index';

export const usePeerConnection = () => {
  const peerConnection = useContext(PeerConnectionContext);

  const socket = useContext(WebSocketContext);

  const handleAddNewIceCandidate = useCallback(
    async (remoteIceCandidate: RTCIceCandidateType) => {
      try {
        if (remoteIceCandidate.candidate) {
          const candidate = new RTCIceCandidate(remoteIceCandidate);
          if (peerConnection) {
            await peerConnection.addIceCandidate(candidate);
          }
        }
      } catch (error) {}
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
  }, [handleAddNewIceCandidate, socket]);

  return peerConnection;
};
