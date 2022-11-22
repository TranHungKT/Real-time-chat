import { ImageSourcePropType } from 'react-native';
import { IMessage, User as IUser } from 'react-native-gifted-chat';

import { User } from './userModels';

export interface Group {
  _id: string;
  name: string;
  members: Member[];
  lastMessage?: LastMessage;
  typeOfGroup: TypeOfGroup;
  lastUpdatedAt: string;
  groupAvatar: ImageSourcePropType | string;
  usersTyping: IUser[];
}

export type Member = Omit<User, 'accessToken'>;

export enum TypeOfGroup {
  ALL = 'ALL',
  IMPORTANT = 'IMPORTANT',
  READ = 'READ',
  UNREAD = 'UNREAD',
}
export interface LastMessage extends Omit<IMessage, 'user'> {
  user: string;
}

export interface GroupResponse {
  _id: string;
  members: Member[];
  typeOfGroup: TypeOfGroup;
  lastUpdatedAt: string;
  lastMessage: LastMessage;
}

export interface GetListGroupResponse {
  count: number;
  list: GroupResponse[];
}
