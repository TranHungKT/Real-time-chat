import { useContext } from 'react';
import { RTCSessionDescription, RTCIceCandidateType } from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { currentGroupSelector } from '@Stores/groups';
import { userIdSelector } from '@Stores/user';

import { CallingContainer } from './containers/CallingContainer';

export const CallingScreen = () => {
  const socket = useContext(WebSocketContext);

  const userId = useSelector(userIdSelector);
  const currentGroup = useSelector(currentGroupSelector);

  const handleSendOffer = (offer: RTCSessionDescription) => {
    socket.emit(SOCKET_EVENTS.OFFER_FOR_CALL_EVENT, {
      groupId: currentGroup?._id,
      offer: offer,
      callerId: userId,
    });
  };

  const handleSendIceCandidate = (iceCandidate: RTCIceCandidateType) => {
    socket.emit(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, {
      groupId: currentGroup?._id,
      iceCandidate: iceCandidate,
    });
  };

  return (
    <CallingContainer
      onHanldeSendOffer={handleSendOffer}
      onHandleSendIceCandidate={handleSendIceCandidate}
    />
  );
};
