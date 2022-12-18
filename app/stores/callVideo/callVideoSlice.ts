import { OfferPayload } from '@Hooks/usePeerConnection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CallVideoState extends Partial<OfferPayload> {}

const initialState: CallVideoState = {};

export const callVideoSlice = createSlice({
  name: 'callVideo',
  initialState,
  reducers: {
    setNewOfferAndGroupId(state, action: PayloadAction<OfferPayload>) {
      state.offer = action.payload.offer;
      state.groupId = action.payload.groupId;
      state.callerId = action.payload.callerId;
    },
  },
});

export const callVideoActions = callVideoSlice.actions;
export const callVideoReducer = callVideoSlice.reducer;
