import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  closeButton: ViewStyle;
  container: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  closeButton: {
    backgroundColor: palette.red,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
  },
});
