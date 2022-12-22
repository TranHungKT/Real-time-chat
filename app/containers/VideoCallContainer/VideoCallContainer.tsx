import { View } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { VideoCallActionButtons } from '@Components/index';
import { useHangingUpCall } from '@Hooks/useHangingUpCall';
import { getLocalStreamSelector, getRemoteStreamSelector } from '@Stores/callVideo';

import { styles } from './VideoCallContainerStyles';

export const VideoCallContainer = () => {
  const localStream = useSelector(getLocalStreamSelector);
  const remoteStream = useSelector(getRemoteStreamSelector);

  const { onHangUpCall } = useHangingUpCall();

  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={localStream?.toURL() || ''} objectFit={'cover'} style={styles.video} />
        <VideoCallActionButtons onHandleHangUpCall={onHangUpCall} />
      </View>
    );
  }

  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={remoteStream.toURL()} objectFit={'cover'} style={styles.video} />
        <RTCView streamURL={localStream.toURL()} objectFit={'cover'} style={styles.videoLocal} />

        <VideoCallActionButtons onHandleHangUpCall={onHangUpCall} />
      </View>
    );
  }
  return <></>;
};
