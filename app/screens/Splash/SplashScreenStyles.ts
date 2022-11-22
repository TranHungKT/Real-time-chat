import { ViewStyle, StyleSheet, ImageStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  image: {
    width: '50%',
    height: '50%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
