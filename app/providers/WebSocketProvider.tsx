import { createContext } from 'react';
import socketIO, { Socket } from 'socket.io-client';

import { BASE_URL } from '@Configs/index';

export const initSocket = (token: string) =>
  socketIO(BASE_URL, {
    path: '/socket',
    transports: ['websocket'],
    auth: {
      token,
    },
    reconnection: false,
  }).connect();

export const WebSocketContext = createContext<Socket>(null as any);
