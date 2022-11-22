import {
  GetListGroupResponse,
  Group,
  LastMessage,
  TypingEventPayload,
  UpdateMessageStatusPayload,
} from '@Models/index';
import { normalizeGroup } from '@Utils/groupUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GroupState {
  groups: {
    [key: string]: Group;
  };
  count: number;
  currentGroupId?: string;
}

const initialState: GroupState = {
  groups: {},
  count: 0,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<{ data: GetListGroupResponse; userId: string }>) {
      const { data, userId } = action.payload;

      data.list.forEach((groupResponse) => {
        state.groups[groupResponse._id] = normalizeGroup(groupResponse, userId);
      });

      state.count = data.count;
    },

    setCurrentGroupId(state, action: PayloadAction<string>) {
      state.currentGroupId = action.payload;
    },

    setLastMessage(state, action: PayloadAction<{ message: LastMessage; groupId?: string }>) {
      const { message, groupId } = action.payload;
      if (groupId) {
        state.groups[groupId].lastMessage = message;
      }
    },

    setTypingEvent(state, action: PayloadAction<TypingEventPayload>) {
      const { groupId } = action.payload;

      if (groupId && state.groups[groupId] !== undefined) {
        const user = state.groups[groupId].usersTyping.find(
          (currentUser) => currentUser._id === action.payload.user._id,
        );

        if (!user) {
          state.groups[groupId].usersTyping = [
            ...state.groups[groupId].usersTyping,
            action.payload.user,
          ];
        }
      }
    },

    unTypingEvent(state, action: PayloadAction<TypingEventPayload>) {
      const { groupId } = action.payload;

      if (groupId) {
        const index = state.groups[groupId].usersTyping.findIndex(
          (user) => user._id === action.payload.user._id,
        );

        state.groups[groupId].usersTyping.splice(index, 1);
      }
    },

    updateLastMessageStatus(state, action: PayloadAction<UpdateMessageStatusPayload>) {
      const { groupId, messageIds, status } = action.payload;

      if (state.groups[groupId] !== undefined) {
        const lastMessageId = state.groups[groupId].lastMessage?._id.toString();

        if (lastMessageId && messageIds.includes(lastMessageId)) {
          (state.groups[groupId].lastMessage as any)[status] = true;
        }
      }
    },
  },
});

export const groupsActions = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
