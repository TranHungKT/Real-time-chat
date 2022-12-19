import { RootState } from '../store';

export const getNewOfferSelector = (state: RootState) => state.callVideo;
export const getGroupIdOfCallSelector = (state: RootState) => state.callVideo.groupId;
