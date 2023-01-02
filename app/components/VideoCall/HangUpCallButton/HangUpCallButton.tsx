import { IconButton } from 'react-native-paper';

import { useHangingUpCall } from '@Hooks/useHangingUpCall';
import { palette } from '@Themes/index';

import { styles } from './HangUpCallButtonStyles';

export const HangUpCallButton = () => {
  const { onHangUpCall } = useHangingUpCall();

  return (
    <IconButton
      icon="phone-hangup-outline"
      onPress={onHangUpCall}
      color={palette.white}
      style={styles.closeButton}
      size={36}
    />
  );
};
