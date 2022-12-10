/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState, useRef } from 'react';
import { MediaStream, RTCPeerConnection } from 'react-native-webrtc';

import { WebSocketContext } from './WebSocketProvider';

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

const CallVideoProvider = () => {
  const socket = useContext(WebSocketContext);
  const [startCalling, setStartCalling] = useState(false);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const peerConnection = useRef<RTCPeerConnection>(null);

  const startCall = () => {};

  return <></>;
};

export default CallVideoProvider;
