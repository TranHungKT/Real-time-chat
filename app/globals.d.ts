import { IMessage as Message } from 'react-native-gifted-chat';

declare module 'react-native-gifted-chat' {
  export interface IMessage extends Omit<Message, 'image'> {
    seen?: boolean;
    image?: string[];
  }
}
