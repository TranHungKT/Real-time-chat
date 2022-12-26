import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  video: ViewStyle;
  videoLocal: ViewStyle;
  closeButton: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },

  closeButton: {
    backgroundColor: palette.red,
    marginBottom: 50,
  },
});
