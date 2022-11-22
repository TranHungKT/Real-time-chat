import { TextStyle, StyleSheet, ViewStyle } from 'react-native';

import { palette, sizes, spacing } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  listIcon: ViewStyle;
  icon: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  text: {
    color: palette.blue,
    fontWeight: 'bold',
    fontSize: sizes.very_large,
  },

  listIcon: {
    flexDirection: 'row',
  },

  icon: {
    marginHorizontal: spacing.small,
  },
});
