import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { palette, sizes } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  avatar: ImageStyle;
  groupNameView: ViewStyle;
  groupName: TextStyle;
  status: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 31,
  },

  groupName: {
    fontWeight: 'bold',
    fontSize: sizes.big,
  },

  groupNameView: {
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },

  status: {
    color: palette.blue,
    fontSize: sizes.medium,
  },
});
