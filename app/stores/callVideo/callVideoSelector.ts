import { RootState } from '../store';

export const getNewOfferSelector = (state: RootState) => state.callVideo.offer;
export const getGroupIdSelector = (state: RootState) => state.callVideo.groupId;
