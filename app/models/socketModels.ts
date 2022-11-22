import { IMessage, User as IUser } from 'react-native-gifted-chat';

export interface SocketErrorPayload {
  type: string;
  payload: unknown;
}

export interface NewMessageFromSocket {
  newMessage: IMessage;
  groupId?: string;
}

export interface TypingEventPayload {
  user: IUser;
  groupId: string;
}

export interface UpdateMessageStatusPayload {
  messageIds: string[];
  groupId: string;
  status: MessageStatus;
}

export interface ReadMessagePayload {
  groupId: string;
  userId: string;
}

export enum MessageStatus {
  RECEIVED = 'received',
  SENT = 'sent',
  SEEN = 'seen',
}
