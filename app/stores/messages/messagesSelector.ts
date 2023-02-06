import { flatMapDeep, map } from 'lodash';

import { MessageStatus } from '@Models/index';
import { userIdSelector } from '@Stores/user';
import { createSelector } from '@reduxjs/toolkit';

import { getCurrentGroupIdSelector } from '../groups/groupsSelector';
import { RootState } from '../store';

export const getGroupMessagesSelector = (state: RootState) => state.messages.groupMessages;

export const getMessagesForGroupSelector = createSelector(
  getGroupMessagesSelector,
  getCurrentGroupIdSelector,
  (groupsMessages, groupId) => {
    return groupId ? groupsMessages[groupId] : undefined;
  },
);

export const getMessagesUnSeenOrReceivedByGroupIdSelector = createSelector(
  getGroupMessagesSelector,
  userIdSelector,
  (groupsMessages, userId) =>
    ({ groupId, status }: { groupId: string; status: MessageStatus }) => {
      if (groupsMessages[groupId]) {
        return groupsMessages[groupId].messages.filter(
          (message) => message.user._id !== userId && !message[status],
        );
      }
    },
);

export const getCurrentPageSelector = createSelector(
  getGroupMessagesSelector,
  (groupMessages) =>
    ({ groupId }: { groupId: string }) => {
      if (groupMessages[groupId]) {
        return groupMessages[groupId].currentPage;
      }
      return 1;
    },
);

export const getImagesForCurrentGroupSelector = createSelector(
  getGroupMessagesSelector,
  getCurrentGroupIdSelector,
  (groupsMessages, groupId) => {
    if (!groupId || !groupsMessages[groupId]) {
      return undefined;
    }
    return flatMapDeep(map(groupsMessages[groupId].messages, 'listImages'));
  },
);
