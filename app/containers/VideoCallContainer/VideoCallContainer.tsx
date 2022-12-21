import { useCallback, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { MediaStream, RTCView } from 'react-native-webrtc';

import { SOCKET_EVENTS } from '@Constants/index';
import { useHangingUpCall } from '@Hooks/useHangingUpCall';
import { WebSocketContext } from '@Providers/index';

import { styles } from './VideoCallContainerStyles';

interface VideoProps {
  onHandleResetStream: () => void;

  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

export const VideoCallContainer = (props: VideoProps) => {
  const { localStream, remoteStream, onHandleResetStream } = props;

  const socket = useContext(WebSocketContext);

  const { onHangUpCall, onResetcall } = useHangingUpCall();

  const streamCleanUp = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.release();
    }
    onHandleResetStream();
  }, [localStream, onHandleResetStream]);

  const cleanUpTheCall = useCallback(() => {
    streamCleanUp();
  }, [streamCleanUp]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.HANG_UP_EVENT, () => {
      cleanUpTheCall();
      onResetcall();
    });
  }, [cleanUpTheCall, onResetcall, socket]);

  const handleHangUpCall = () => {
    cleanUpTheCall();
    onHangUpCall();
  };

  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={localStream?.toURL() || ''} objectFit={'cover'} style={styles.video} />
      </View>
    );
  }

  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={remoteStream.toURL()} objectFit={'cover'} style={styles.video} />
        <RTCView streamURL={localStream.toURL()} objectFit={'cover'} style={styles.videoLocal} />
        <Button onPress={handleHangUpCall}>Close</Button>
      </View>
    );
  }
  return <></>;
};
