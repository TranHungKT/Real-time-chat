import { ImageBackground, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { palette } from '@Themes/index';

import { styles } from './GettingCallStyles';

interface GettingCallProps {
  hangUp: () => void;
  join: () => void;
}

export const GettingCall = (props: GettingCallProps) => {
  const { hangUp, join } = props;
  return (
    <ImageBackground
      source={require('../../../../../assets/images/avatar.png')}
      style={styles.container}
    >
      <View style={styles.button}>
        <TouchableOpacity onPress={join}>
          <Icon name="phone" style={styles.joinPhone} size={32} color={palette.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={hangUp}>
          <Icon name="phone" style={styles.hangUpPhone} size={32} color={palette.white} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
