import { StyleSheet, ViewStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
  joinPhone: ViewStyle;
  hangUpPhone: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    marginBottom: 50,
    paddingHorizontal: 60,
    width: '100%',
    justifyContent: 'space-between',
  },

  joinPhone: {
    backgroundColor: palette.green,
    borderRadius: 30,
    padding: 10,
  },

  hangUpPhone: {
    backgroundColor: palette.red,
    borderRadius: 30,
    padding: 10,
  },
});
