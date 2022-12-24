import { RootState } from '../store';

export const getNewOfferSelector = (state: RootState) => state.callVideo;
export const getGroupIdOfCallSelector = (state: RootState) => state.callVideo.groupId;
export const getIsCreateNewCallSelector = (state: RootState) => state.callVideo.isCalling;
export const getIsGettingCallSelector = (state: RootState) => state.callVideo.isGettingCall;
export const getLocalStreamSelector = (state: RootState) => state.callVideo.localStream;
export const getRemoteStreamSelector = (state: RootState) => state.callVideo.remoteStream;
export const getCallerIdSelector = (state: RootState) => state.callVideo.callerId;
