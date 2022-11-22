export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  avatarUrl: string;
  status?: UserStatus;
}

export enum UserStatus {
  OFFLINE = 1,
  ONLINE,
}
