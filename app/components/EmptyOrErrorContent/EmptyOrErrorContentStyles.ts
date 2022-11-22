import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { palette, sizes } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  subTitle: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 0.9,
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '50%',
  },

  title: {
    textAlign: 'center',
    fontSize: sizes.large,
    fontWeight: 'bold',
    color: palette.blue,
  },

  subTitle: {
    textAlign: 'center',
    fontSize: sizes.medium,
    color: palette.blue,
    marginTop: 10,
  },
});
