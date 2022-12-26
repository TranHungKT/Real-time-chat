import { View } from 'react-native';
import { RTCView, MediaStream } from 'react-native-webrtc';

import { VideoCallActionButtons } from '../VideoCallActionButtons/VideoCallActionButtons';
import { styles } from './VideoCallWithCalleeStyles';

interface VideoCallWithCalleeProps {
  localStream: MediaStream;
  remoteStream: MediaStream;
  onToogleStream: (type: 'audio' | 'video') => () => void;
}

export const VideoCallWithCallee = (props: VideoCallWithCalleeProps) => {
  const { localStream, remoteStream, onToogleStream } = props;

  return (
    <View style={styles.container}>
      <RTCView streamURL={remoteStream.toURL()} objectFit={'cover'} style={styles.video} />
      <RTCView streamURL={localStream.toURL()} objectFit={'cover'} style={styles.videoLocal} />

      <VideoCallActionButtons
        onToogleAudio={onToogleStream('audio')}
        onToggleVideo={onToogleStream('video')}
      />
    </View>
  );
};
