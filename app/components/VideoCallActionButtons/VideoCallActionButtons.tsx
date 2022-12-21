import { IconButton } from 'react-native-paper';

import { palette } from '@Themes/index';

import { styles } from './VideoCallActionButtonsStyles';

interface VideoCallActionButtonsProps {
  onHandleHangUpCall: () => void;
}
export const VideoCallActionButtons = (props: VideoCallActionButtonsProps) => {
  const { onHandleHangUpCall } = props;

  return (
    <IconButton
      icon="phone-hangup-outline"
      onPress={onHandleHangUpCall}
      color={palette.white}
      style={styles.closeButton}
      size={36}
    />
  );
};
