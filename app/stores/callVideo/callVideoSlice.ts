import { MediaStream } from 'react-native-webrtc';

import { OfferPayload } from '@Hooks/usePeerConnection';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CallVideoState extends Partial<OfferPayload> {
  isCalling?: boolean;
  isGettingCall?: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

const initialState: CallVideoState = {
  localStream: null,
  remoteStream: null,
};

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
      state.remoteStream = null;
      state.localStream = null;
    },

    setCreateNewCall(state) {
      state.isCalling = true;
    },

    setLocalStream(state, action: PayloadAction<MediaStream>) {
      state.localStream = action.payload;
    },
    setRemoteStream(state, action: PayloadAction<MediaStream>) {
      state.remoteStream = action.payload;
    },
    resetStream(state) {
      state.localStream = null;
      state.remoteStream = null;
    },
  },
});

export const callVideoActions = callVideoSlice.actions;
export const callVideoReducer = callVideoSlice.reducer;
