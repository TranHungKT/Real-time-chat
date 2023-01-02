export const SOCKET_EVENTS = {
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  SEND_MESSAGE: 'send-message',
  GET_MESSAGE: 'get-message',
  RECEIVED_MESSAGE: 'received-message',
  SEEN_MESSAGE: 'seen-message',
  SOCKET_ERROR: 'socket-error',
  TYPING: 'typing',
  UN_TYPING: 'un-typing',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  OFFER_FOR_CALL_EVENT: 'offer-for-call-event',
  ANSWER_FOR_CALL_EVENT: 'answer-for-call-event',
  ICE_CANDIDATE_EVENT: 'ice-candidate-event',
  HANG_UP_EVENT: 'hang-up-event',
  TOOGLE_AUDIO_EVENT: 'toogle-audio-event',
  TOOGLE_VIDEO_EVENT: 'toogle-video-event',
};

export const SOCKET_ERROR_TYPE = {
  JOIN_ROOM_FAIL: 'JOIN_ROOM_FAIL',
  SAVE_MESSAGE_ERROR: 'SAVE_MESSAGE_ERROR',
  SEND_MESSAGE_ERROR: 'SEND_MESSAGE_ERROR',
  SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
};
