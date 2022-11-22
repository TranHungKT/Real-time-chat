import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Style {
  container: ViewStyle;
  buttonWhenNotFocused: ViewStyle;
  buttonWhenFocused: ViewStyle;
  textWhenFocused: TextStyle;
  textWhenNotFocused: TextStyle;
}

export const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  buttonWhenNotFocused: {
    backgroundColor: palette.white,
  },

  buttonWhenFocused: {
    backgroundColor: palette.blue,
  },

  textWhenFocused: {
    color: palette.white,
    fontWeight: 'bold',
  },

  textWhenNotFocused: {
    color: palette.black,
    fontWeight: 'bold',
  },
});
