import { useCallback, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { callVideoActions, getGroupIdOfCallSelector } from '@Stores/callVideo';
import { useAppDispatch } from '@Stores/index';
import { useNavigation } from '@react-navigation/native';

import { styles } from './VideoCallContainerStyles';

interface VideoProps {
  onHandleResetStream: () => void;

  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

export const VideoCallContainer = (props: VideoProps) => {
  const { localStream, remoteStream, onHandleResetStream } = props;
  const socket = useContext(WebSocketContext);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const groupId = useSelector(getGroupIdOfCallSelector);

  const streamCleanUp = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.release();
    }
    onHandleResetStream();
  }, [localStream, onHandleResetStream]);

  const handleEmitHangUpEvent = () => {
    socket.emit(SOCKET_EVENTS.HANG_UP_EVENT, {
      groupId: groupId,
    });
  };

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const cleanUpTheCall = useCallback(() => {
    streamCleanUp();

    dispatch(callVideoActions.resetCall());

    navigateBack();
  }, [dispatch, navigateBack, streamCleanUp]);

  const hangUp = () => {
    handleEmitHangUpEvent();
    cleanUpTheCall();
  };

  useEffect(() => {
    socket.on(SOCKET_EVENTS.HANG_UP_EVENT, () => {
      cleanUpTheCall();
    });
  }, [cleanUpTheCall, navigateBack, socket, streamCleanUp]);

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
