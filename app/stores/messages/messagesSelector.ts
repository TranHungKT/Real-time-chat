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
