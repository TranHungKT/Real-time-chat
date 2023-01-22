import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  image: ImageStyle;
  wrapperImageStyle: ImageStyle;
  listImages: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  image: {
    minWidth: 100,
    minHeight: 100,
    borderRadius: 20,
    marginBottom: 5,
    overflow: 'hidden',
    marginHorizontal: 2,
  },

  wrapperImageStyle: {
    backgroundColor: palette.white,
  },

  listImages: {
    backgroundColor: palette.white,
  },
});
