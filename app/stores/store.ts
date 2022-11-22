import { useDispatch } from 'react-redux';
import createDebugger from 'redux-flipper';

import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';

import { groupsReducer } from './groups';
import { messagesReducer } from './messages';
import { userReducer } from './user';

export const reducer = {
  user: userReducer,
  groups: groupsReducer,
  messages: messagesReducer,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createDebugger()),
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
