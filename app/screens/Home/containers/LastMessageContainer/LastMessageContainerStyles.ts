import { StyleSheet, TextStyle } from 'react-native';

import { palette, sizes } from '@Themes/index';

interface Styles {
  chat: TextStyle;
  chatWhenHaveUnReadMessage: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  chat: {
    fontSize: sizes.medium,
    color: palette.lightGrey,
    marginTop: 5,
  },

  chatWhenHaveUnReadMessage: {
    color: palette.blue,
  },
});
