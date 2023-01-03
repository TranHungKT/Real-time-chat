import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  videoLocal: ViewStyle;
  closeButton: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 30,
    right: 30,
    elevation: 10,
    borderRadius: 10,
    zIndex: 10,
  },

  closeButton: {
    backgroundColor: palette.red,
    marginBottom: 50,
  },
});
