import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  information: ViewStyle;
  avatar: ImageStyle;
  userName: TextStyle;
  text: TextStyle;
  actionButtons: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: palette.white,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  information: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 26,
    marginRight: 20,
  },

  userName: {
    fontWeight: 'bold',
    color: palette.black,
    fontSize: 18,
  },

  text: {
    color: palette.black,
    fontSize: 18,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});
