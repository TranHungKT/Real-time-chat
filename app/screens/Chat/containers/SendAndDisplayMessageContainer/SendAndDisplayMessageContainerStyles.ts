import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  ticksView: ViewStyle;
  ticks: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  ticksView: {
    flexDirection: 'row',
    marginRight: 10,
  },

  ticks: {
    color: palette.white,
    fontSize: 10,
  },
});
