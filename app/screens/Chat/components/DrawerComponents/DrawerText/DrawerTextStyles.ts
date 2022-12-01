import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  text: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  text: {
    fontSize: 18,
    color: palette.blue,
    fontWeight: 'bold',
  },
});
