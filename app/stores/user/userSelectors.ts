import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const userDataSelector = (state: RootState) => state.user.userData;
export const userTokenSelector = (state: RootState) => state.user.userData.accessToken;
export const userIdSelector = (state: RootState) => state.user.userData._id;
export const usersStatusSelector = (state: RootState) => state.user.usersStatus;

export const getUserStatusByIdSelector = createSelector(
  usersStatusSelector,
  (usersStatus) =>
    ({ userId }: { userId: string }) =>
      usersStatus[userId],
);
