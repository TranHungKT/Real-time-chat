import { useCallback, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { MediaStream, RTCView, RTCPeerConnection } from 'react-native-webrtc';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { useNavigation } from '@react-navigation/native';

import { styles } from './VideoCallContainerStyles';

interface VideoProps {
  onHandleResetStream: () => void;
  onHandleEmitHangUpEvent: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
  peerConnection?: RTCPeerConnection;
}

export const VideoCallContainer = (props: VideoProps) => {
  const {
    localStream,
    remoteStream,
    peerConnection,
    onHandleResetStream,
    onHandleEmitHangUpEvent,
  } = props;
  const socket = useContext(WebSocketContext);
  const navigation = useNavigation();
  const streamCleanUp = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.release();
    }
    onHandleResetStream();
  }, [localStream, onHandleResetStream]);

  const closePeerConnection = useCallback(() => {
    if (peerConnection) {
      peerConnection.close();
    }
  }, [peerConnection]);

  const hangUp = () => {
    onHandleEmitHangUpEvent();
    streamCleanUp();
    closePeerConnection();
    navigateBack();
  };

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.HANG_UP_EVENT, () => {
      streamCleanUp();
      closePeerConnection();
      navigateBack();
    });
  }, [closePeerConnection, navigateBack, socket, streamCleanUp]);

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
        <Button onPress={hangUp}>Close</Button>
      </View>
    );
  }
  return <></>;
};
