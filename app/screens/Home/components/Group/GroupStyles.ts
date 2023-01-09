import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

import { palette, sizes, spacing } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  groupView: ViewStyle;
  groupName: TextStyle;
  chat: TextStyle;
  avatarImage: ImageStyle;
  avatarView: ViewStyle;
  rightCol: ViewStyle;
  lastUpdatedTime: TextStyle;
  numberOfUnReadMessageView: ViewStyle;
  numberOfUnReadMessageText: TextStyle;
  status: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: spacing.large,
    alignItems: 'center',
    backgroundColor: palette.white,
  },

  groupView: {
    flex: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },

  groupName: {
    fontSize: 23,
    fontWeight: 'bold',
  },

  avatarView: {
    flex: 3,
    marginTop: -40,
  },

  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  rightCol: {
    flex: 2,
    paddingTop: 7,
    paddingBottom: 7,
    alignItems: 'flex-end',
  },

  chat: {
    fontSize: sizes.medium,
    color: palette.lightGrey,
    marginTop: 5,
  },

  lastUpdatedTime: {
    fontSize: 17,
    color: palette.lightGrey,
  },

  numberOfUnReadMessageView: {
    backgroundColor: palette.blue,
    height: 26,
    width: 26,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberOfUnReadMessageText: {
    color: palette.white,
    fontSize: sizes.medium,
  },

  status: {
    color: palette.green,
    bottom: 0,
    top: 40,
    left: 40,
  },
});
