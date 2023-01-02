import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { palette } from '@Themes/index';

import { HangUpCallButton } from '../HangUpCallButton/HangUpCallButton';
import { styles } from './VideoCallActionButtonsStyles';

interface VideoCallActionButtonsProps {
  onToogleAudio: () => void;
  onToggleVideo: () => void;
  isVideoEnable: boolean;
  isAudioEnable: boolean;
}
export const VideoCallActionButtons = (props: VideoCallActionButtonsProps) => {
  const { onToogleAudio, onToggleVideo, isAudioEnable, isVideoEnable } = props;

  return (
    <View style={styles.container}>
      <IconButton
        icon={isAudioEnable ? 'microphone' : 'microphone-off'}
        onPress={onToogleAudio}
        color={palette.white}
        size={36}
      />

      <HangUpCallButton />

      <IconButton
        icon={isVideoEnable ? 'video-outline' : 'video-off-outline'}
        onPress={onToggleVideo}
        color={palette.white}
        size={36}
      />
    </View>
  );
};
