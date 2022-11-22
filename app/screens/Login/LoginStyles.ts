import { ViewStyle, StyleSheet, ImageStyle } from 'react-native';

import { palette } from '@Themes/palette';

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  logo: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  button: {
    marginTop: 100,
    marginHorizontal: 20,
  },

  logo: {
    width: '50%',
    height: '50%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
