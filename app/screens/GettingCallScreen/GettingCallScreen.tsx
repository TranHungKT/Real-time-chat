import { useContext } from 'react';
import { RTCSessionDescription, RTCIceCandidateType } from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { getNewOfferSelector } from '@Stores/callVideo';

import { GettingCallContainer } from './containers/GettingCallContainer/GettingCallContainer';

export const GettingCallScreen = () => {
  const socket = useContext(WebSocketContext);

  const { groupId } = useSelector(getNewOfferSelector);

  const handleEmitAnswerEvent = (answerDescription?: RTCSessionDescription) => {
    socket.emit(SOCKET_EVENTS.ANSWER_FOR_CALL_EVENT, {
      groupId: groupId,
      answer: answerDescription,
    });
  };

  const handleEmitIceCandidate = (iceCandidate: RTCIceCandidateType) => {
    socket.emit(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, {
      groupId: groupId,
      iceCandidate: iceCandidate,
    });
  };

  const handleEmitHangUpEvent = () => {
    socket.emit(SOCKET_EVENTS.HANG_UP_EVENT, {
      groupId: groupId,
    });
  };

  return (
    <GettingCallContainer
      onHandleEmitAnswerEvent={handleEmitAnswerEvent}
      onHandleEmitIceCandidate={handleEmitIceCandidate}
      onHandleEmitHangUpEvent={handleEmitHangUpEvent}
    />
  );
};
