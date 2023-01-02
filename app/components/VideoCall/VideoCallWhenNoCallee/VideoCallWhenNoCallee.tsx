import { View } from 'react-native';
import { RTCView, MediaStream } from 'react-native-webrtc';

import { HangUpCallButton } from '../HangUpCallButton/HangUpCallButton';
import { styles } from './VideoCallWhenNoCalleeStyles';

interface VideoCallWhenNoCalleeProps {
  localStream: MediaStream;
}

export const VideoCallWhenNoCallee = (props: VideoCallWhenNoCalleeProps) => {
  const { localStream } = props;

  return (
    <View style={styles.container}>
      <RTCView streamURL={localStream.toURL()} objectFit={'cover'} style={styles.video} />
      <HangUpCallButton />
    </View>
  );
};
