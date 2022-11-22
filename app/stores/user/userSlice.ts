import { DEFAULT_USER_DATA } from '@Constants/index';
import { User, UserStatus } from '@Models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userData: User;
  usersStatus: Record<string, UserStatus>;
}

const initialState: UserState = {
  userData: DEFAULT_USER_DATA,
  usersStatus: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },

    setUsersStatus(state, action: PayloadAction<Record<string, UserStatus>>) {
      state.usersStatus = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
