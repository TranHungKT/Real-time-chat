import { RootState } from '../store';

export const getNewOfferSelector = (state: RootState) => state.callVideo;
export const getGroupIdSelector = (state: RootState) => state.callVideo.groupId;
