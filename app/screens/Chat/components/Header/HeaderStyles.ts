import { StyleSheet, ViewStyle } from 'react-native';

import { palette, paddingHorizontalSpace } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  firstColumn: ViewStyle;

  profileIconView: ViewStyle;
  profileIconRow: ViewStyle;
  profileIcon: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: paddingHorizontalSpace,
    alignItems: 'center',
  },

  firstColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileIconView: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },

  profileIconRow: {
    flexDirection: 'row',
  },

  profileIcon: {
    margin: -10,
    color: palette.blue,
  },
});
