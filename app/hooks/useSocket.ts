import { useContext, useEffect } from 'react';

import { SOCKET_EVENTS } from '@Constants/index';
import {
  MessageStatus,
  NewMessageFromSocket,
  TypingEventPayload,
  UpdateMessageStatusPayload,
} from '@Models/index';
import { WebSocketContext } from '@Providers/index';

import { useReduxForTypingEvent } from './useReduxForTypingEvent';
import { useReduxToAddNewMessage } from './useReduxToAddNewMessage';
import { useReduxToUpdateMessageStatus } from './useReduxToUpdateMessageStatus';

export const useSocket = () => {
  const socket = useContext(WebSocketContext);

  const handleAddNewMessage = useReduxToAddNewMessage();
  const [handleTypingEvent, handleUnTypingEvent] = useReduxForTypingEvent();
  const [handleUpdateMessageStatus] = useReduxToUpdateMessageStatus();

  useEffect(() => {
    socket.on(SOCKET_EVENTS.GET_MESSAGE, (payload: NewMessageFromSocket) => {
      handleAddNewMessage(payload);
    });

    socket.on(SOCKET_EVENTS.TYPING, (payload: TypingEventPayload) => {
      handleTypingEvent(payload);
    });

    socket.on(SOCKET_EVENTS.UN_TYPING, (payload: TypingEventPayload) => {
      handleUnTypingEvent(payload);
    });

    socket.on(SOCKET_EVENTS.RECEIVED_MESSAGE, (payload: UpdateMessageStatusPayload) => {
      handleUpdateMessageStatus({ ...payload, status: MessageStatus.RECEIVED });
    });

    socket.on(SOCKET_EVENTS.SEEN_MESSAGE, (payload: UpdateMessageStatusPayload) => {
      handleUpdateMessageStatus({ ...payload, status: MessageStatus.SEEN });
    });

    return () => {
      socket.off(SOCKET_EVENTS.GET_MESSAGE);
    };
  }, [
    socket,
    handleAddNewMessage,
    handleTypingEvent,
    handleUnTypingEvent,
    handleUpdateMessageStatus,
  ]);

  return socket;
};
