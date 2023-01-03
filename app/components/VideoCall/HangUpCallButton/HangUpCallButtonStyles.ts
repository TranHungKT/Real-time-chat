import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  closeButton: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  closeButton: {
    backgroundColor: palette.red,
  },
});
