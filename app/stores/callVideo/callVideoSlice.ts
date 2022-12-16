import { RTCSessionDescriptionType } from 'react-native-webrtc';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CallVideoState {
  offer?: RTCSessionDescriptionType;
  groupId?: string;
}

const initialState: CallVideoState = {};

export const callVideoSlice = createSlice({
  name: 'callVideo',
  initialState,
  reducers: {
    setNewOfferAndGroupId(
      state,
      action: PayloadAction<{ offer: RTCSessionDescriptionType; groupId: string }>,
    ) {
      state.offer = action.payload.offer;
      state.groupId = action.payload.groupId;
    },
  },
});

export const callVideoActions = callVideoSlice.actions;
export const callVideoReducer = callVideoSlice.reducer;
