import { IMessage as Message } from 'react-native-gifted-chat';

declare module 'react-native-gifted-chat' {
  export interface IMessage extends Message {
    seen?: boolean;
    listImages?: string[];
  }
}
