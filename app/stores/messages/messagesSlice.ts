import { IMessage } from 'react-native-gifted-chat';

import { NewMessageFromSocket, UpdateMessageStatusPayload } from '@Models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessagesState {
  groupMessages: {
    [groupId: string]: {
      messages: IMessage[];
      count: number;
      currentPage: number;
    };
  };
}

const initialState: MessagesState = {
  groupMessages: {},
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(
      state,
      action: PayloadAction<{
        list: IMessage[];
        count: number;
        groupId: string;
        currentPage: number;
      }>,
    ) {
      const { groupId, count, list, currentPage } = action.payload;

      if (state.groupMessages[groupId]) {
        state.groupMessages[groupId] = {
          messages: [...state.groupMessages[groupId].messages, ...list],
          count: count,
          currentPage: currentPage,
        };
      } else {
        state.groupMessages[groupId] = {
          messages: list,
          count: count,
          currentPage: currentPage,
        };
      }
    },

    addNewMessageToCurrentGroup(state, action: PayloadAction<NewMessageFromSocket>) {
      const { groupId, newMessage } = action.payload;

      if (groupId && state.groupMessages[groupId]) {
        state.groupMessages[groupId].messages = [
          newMessage,
          ...state.groupMessages[groupId].messages,
        ];
        state.groupMessages[groupId].count += 1;
      }
      return;
    },

    updateMessageStatus(state, action: PayloadAction<UpdateMessageStatusPayload>) {
      const { groupId, messageIds, status } = action.payload;

      if (state.groupMessages[groupId]) {
        messageIds.forEach((messageId) => {
          const messageIndex = state.groupMessages[groupId].messages.findIndex(
            (message) => message._id === messageId,
          );

          if (messageIndex !== -1) {
            state.groupMessages[groupId].messages[messageIndex][status] = true;
          }
        });
      }
    },
  },
});

export const messagesActions = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
