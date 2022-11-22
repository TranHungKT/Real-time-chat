import { ImageStyle, StyleSheet } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  image: ImageStyle;
  wrapperImageStyle: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  image: {
    minWidth: 100,
    minHeight: 100,
    borderRadius: 20,
    marginBottom: 5,
  },

  wrapperImageStyle: {
    backgroundColor: palette.white,
  },
});
