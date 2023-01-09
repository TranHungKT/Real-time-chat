import { StyleSheet, ViewStyle } from 'react-native';

import { palette, spacing } from '@Themes/index';

interface Styles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: palette.blue,
    width: '60%',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: spacing.large,
    paddingHorizontal: 40,
  },
});
