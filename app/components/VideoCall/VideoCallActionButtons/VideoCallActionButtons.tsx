import { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useHangingUpCall } from '@Hooks/useHangingUpCall';
import { palette } from '@Themes/index';

import { styles } from './VideoCallActionButtonsStyles';

interface VideoCallActionButtonsProps {
  onToogleAudio?: () => void;
  onToggleVideo?: () => void;
}
export const VideoCallActionButtons = (props: VideoCallActionButtonsProps) => {
  const { onToogleAudio, onToggleVideo } = props;

  const [isVideoEnable, setIsVideoEnable] = useState(true);
  const [isAudioEnable, setIsAudioEnable] = useState(true);

  const { onHangUpCall } = useHangingUpCall();

  const handleToogleVideo = () => {
    setIsVideoEnable(!isVideoEnable);
    onToggleVideo && onToggleVideo();
  };

  const handleToogleAudio = () => {
    setIsAudioEnable(!isAudioEnable);
    onToogleAudio && onToogleAudio();
  };

  return (
    <View style={styles.container}>
      {onToogleAudio && (
        <IconButton
          icon={isAudioEnable ? 'microphone' : 'microphone-off'}
          onPress={handleToogleAudio}
          color={palette.white}
          size={36}
        />
      )}
      <IconButton
        icon="phone-hangup-outline"
        onPress={onHangUpCall}
        color={palette.white}
        style={styles.closeButton}
        size={36}
      />
      {onToggleVideo && (
        <IconButton
          icon={isVideoEnable ? 'video-outline' : 'video-off-outline'}
          onPress={handleToogleVideo}
          color={palette.white}
          size={36}
        />
      )}
    </View>
  );
};
