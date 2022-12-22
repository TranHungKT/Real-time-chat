import { useCallback, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { VideoCallActionButtons } from '@Components/index';
import { SOCKET_EVENTS } from '@Constants/index';
import { useHangingUpCall } from '@Hooks/useHangingUpCall';
import { WebSocketContext } from '@Providers/index';
import { getLocalStreamSelector, getRemoteStreamSelector } from '@Stores/callVideo';

import { styles } from './VideoCallContainerStyles';

export const VideoCallContainer = () => {
  const localStream = useSelector(getLocalStreamSelector);
  const remoteStream = useSelector(getRemoteStreamSelector);

  const socket = useContext(WebSocketContext);

  const { onHangUpCall, onResetCall } = useHangingUpCall();

  const streamCleanUp = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.release();
    }
  }, [localStream]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.HANG_UP_EVENT, () => {
      onResetCall();
      streamCleanUp();
    });
  }, [onResetCall, socket, streamCleanUp]);

  const handleHangUpCall = () => {
    onHangUpCall();
    streamCleanUp();
  };

  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={localStream?.toURL() || ''} objectFit={'cover'} style={styles.video} />
        <VideoCallActionButtons onHandleHangUpCall={handleHangUpCall} />
      </View>
    );
  }

  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={remoteStream.toURL()} objectFit={'cover'} style={styles.video} />
        <RTCView streamURL={localStream.toURL()} objectFit={'cover'} style={styles.videoLocal} />

        <VideoCallActionButtons onHandleHangUpCall={handleHangUpCall} />
      </View>
    );
  }
  return <></>;
};
