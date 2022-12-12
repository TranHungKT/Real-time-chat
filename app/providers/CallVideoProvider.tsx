import { createContext } from 'react';
import { RTCPeerConnection } from 'react-native-webrtc';

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

export const initPeerConnection = async () => {
  try {
    return new RTCPeerConnection(configuration);
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const PeerConnectionContext = createContext<RTCPeerConnection>(null as any);
