import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { deviceHeight, deviceWidth } from '@Constants/index';
import { palette } from '@Themes/index';

interface Styles {
  video: ViewStyle;
  calleeTurnOffVideo: ViewStyle;
  calleName: TextStyle;
  avatar: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  video: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
  },

  calleeTurnOffVideo: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: palette.black,
    justifyContent: 'center',
    alignItems: 'center',
  },

  calleName: {
    color: palette.white,
    alignSelf: 'center',
  },

  avatar: {
    height: 56,
    width: 56,
  },
});
