import { View } from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';

import { styles } from './VideoStyles';

interface VideoProps {
  hangUp: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

export const Video = (props: VideoProps) => {
  const { localStream, remoteStream } = props;
  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={localStream?.toURL() || ''} objectFit={'cover'} style={styles.video} />
      </View>
    );
  }
  console.log({ remoteStream });
  console.log({ localStream });
  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={remoteStream.toURL()} objectFit={'cover'} style={styles.video} />
        <RTCView streamURL={localStream.toURL()} objectFit={'cover'} style={styles.videoLocal} />
      </View>
    );
  }
  return <></>;
};
