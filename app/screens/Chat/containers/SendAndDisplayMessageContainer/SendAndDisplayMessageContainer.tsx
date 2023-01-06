import { map } from 'lodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { useReduxToUpdateMessageStatus } from '@Hooks/useReduxToUpdateMessageStatus';
import { MessageStatus, SocketErrorPayload, NewMessageContent } from '@Models/index';
import { WebSocketContext } from '@Providers/index';
import { getCurrentGroupIdSelector } from '@Stores/groups';
import { getMessagesUnSeenOrReceivedByGroupIdSelector } from '@Stores/messages';
import { userIdSelector } from '@Stores/user';

import { DisplayMessageContainer } from '../DisplayMessageContainer';

interface SendAndDisplayMessageContainerProps {
  messages?: IMessage[];
  onLoadEarlierMessages: () => void;
}

export const SendAndDisplayMessageContainer = (props: SendAndDisplayMessageContainerProps) => {
  const { messages, onLoadEarlierMessages } = props;
  const socket = useContext(WebSocketContext);

  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const userId = useSelector(userIdSelector);
  const groupMessagesUnSeenSelector = useSelector(getMessagesUnSeenOrReceivedByGroupIdSelector);
  const groupMessagesUnSeen = groupMessagesUnSeenSelector({
    groupId: currentGroupId || '',
    status: MessageStatus.SEEN,
  });

  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');

  const [handleUpdateMessageStatus] = useReduxToUpdateMessageStatus();

  const handleSendMessage = useCallback(
    (newMessages: NewMessageContent[] = []) => {
      newMessages.forEach((newMessage) => {
        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
          roomId: currentGroupId,
          message: { text: newMessage.text, user: userId, image: newMessage.image },
        });
      });
    },
    [userId, currentGroupId, socket],
  );

  const handleTextInputChanged = useCallback(
    (text: string) => {
      if (!currentText && !!text) {
        socket.emit(SOCKET_EVENTS.TYPING, {
          groupId: currentGroupId,
          user: userId,
        });
      }
      if (currentText && !text) {
        socket.emit(SOCKET_EVENTS.UN_TYPING, {
          groupId: currentGroupId,
          user: userId,
        });
      }
      setCurrentText(text);
    },
    [currentGroupId, currentText, socket, userId],
  );

  useEffect(() => {
    socket.on(SOCKET_EVENTS.SOCKET_ERROR, (payload: SocketErrorPayload) => {
      console.error(payload.type);
    });
    socket.on(SOCKET_EVENTS.TYPING, () => {
      setIsTyping(true);
    });

    socket.on(SOCKET_EVENTS.UN_TYPING, () => {
      setIsTyping(false);
    });
  }, [socket]);

  useEffect(() => {
    if (groupMessagesUnSeen && groupMessagesUnSeen.length) {
      const groupMessagesUnSeenIds = map(groupMessagesUnSeen, '_id');
      socket.emit(SOCKET_EVENTS.SEEN_MESSAGE, {
        groupId: currentGroupId,
        messageIds: groupMessagesUnSeenIds,
      });

      handleUpdateMessageStatus({
        groupId: currentGroupId || '',
        messageIds: groupMessagesUnSeenIds as string[],
        status: MessageStatus.SEEN,
      });
    }
  }, [currentGroupId, groupMessagesUnSeen, handleUpdateMessageStatus, socket]);

  return (
    <DisplayMessageContainer
      messages={messages}
      isTyping={isTyping}
      onTextInputChanged={handleTextInputChanged}
      onSendMessages={handleSendMessage}
      onLoadEarlierMessages={onLoadEarlierMessages}
    />
  );
};
