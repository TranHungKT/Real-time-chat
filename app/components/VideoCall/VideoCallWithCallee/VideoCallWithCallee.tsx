import { useState } from 'react';
import { View } from 'react-native';
import { RTCView, MediaStream } from 'react-native-webrtc';

import { SOCKET_EVENTS } from '@Constants/index';

import { VideoCallActionButtons } from '../VideoCallActionButtons/VideoCallActionButtons';
import { styles } from './VideoCallWithCalleeStyles';

interface VideoCallWithCalleeProps {
  localStream: MediaStream;
  remoteStream: MediaStream;
  onToogleStream: (type: 'audio' | 'video') => void;
  onEmitToggleStreamSocketEvent: ({ event, value }: { event: string; value: boolean }) => void;
}

export const VideoCallWithCallee = (props: VideoCallWithCalleeProps) => {
  const { localStream, remoteStream, onToogleStream, onEmitToggleStreamSocketEvent } = props;
  const [isVideoEnable, setIsVideoEnable] = useState(true);
  const [isAudioEnable, setIsAudioEnable] = useState(true);

  const handleToogleVideo = () => {
    onToogleStream('video');
    onEmitToggleStreamSocketEvent({
      event: SOCKET_EVENTS.TOOGLE_VIDEO_EVENT,
      value: !isVideoEnable,
    });
    setIsVideoEnable(!isVideoEnable);
  };

  const handleToogleAudio = () => {
    onToogleStream('audio');
    onEmitToggleStreamSocketEvent({
      event: SOCKET_EVENTS.TOOGLE_AUDIO_EVENT,
      value: !isAudioEnable,
    });
    setIsAudioEnable(!isAudioEnable);
  };

  return (
    <View style={styles.container}>
      <RTCView streamURL={remoteStream.toURL()} objectFit={'cover'} style={styles.video} />
      <RTCView
        streamURL={localStream.toURL()}
        objectFit={'cover'}
        style={isVideoEnable ? styles.videoLocal : styles.turnOffVideoLocal}
      />

      <VideoCallActionButtons
        onToogleAudio={handleToogleAudio}
        onToggleVideo={handleToogleVideo}
        isAudioEnable={isAudioEnable}
        isVideoEnable={isVideoEnable}
      />
    </View>
  );
};
