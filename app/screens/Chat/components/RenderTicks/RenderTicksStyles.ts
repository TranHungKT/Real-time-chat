import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  ticksView: ViewStyle;
  ticks: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  ticksView: {
    flexDirection: 'row',
  },

  ticks: {
    color: palette.black,
    fontSize: 10,
  },
});
