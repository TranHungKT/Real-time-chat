import { OfferPayload } from '@Hooks/usePeerConnection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CallVideoState extends Partial<OfferPayload> {
  isCalling?: boolean;
  isGettingCall?: boolean;
}

const initialState: CallVideoState = {};

export const callVideoSlice = createSlice({
  name: 'callVideo',
  initialState,
  reducers: {
    setNewOfferAndGroupId(state, action: PayloadAction<OfferPayload>) {
      state.offer = action.payload.offer;
      state.groupId = action.payload.groupId;
      state.callerId = action.payload.callerId;
      state.isGettingCall = true;
    },
    setGroupId(state, action: PayloadAction<{ groupId: string }>) {
      state.groupId = action.payload.groupId;
    },
    resetCall(state) {
      state.callerId = undefined;
      state.groupId = undefined;
      state.offer = undefined;
      state.isCalling = false;
      state.isGettingCall = false;
    },

    setCreateNewCall(state) {
      state.isCalling = true;
    },
  },
});

export const callVideoActions = callVideoSlice.actions;
export const callVideoReducer = callVideoSlice.reducer;
