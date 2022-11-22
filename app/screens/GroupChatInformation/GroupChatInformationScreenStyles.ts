import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COMMON_STYLES } from '@Constants/index';
import { paddingHorizontalSpace, palette, sizes } from '@Themes/index';

interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  phoneTitle: TextStyle;
  phoneNumber: TextStyle;
  border: TextStyle;
  fileTabs: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  safeArea: {
    ...COMMON_STYLES.safeArea,
  },

  container: {
    marginHorizontal: paddingHorizontalSpace,
    paddingBottom: 20,
    borderBottomColor: palette.lightGrey,
    borderBottomWidth: 0.8,
  },

  phoneTitle: {
    fontWeight: 'bold',
    fontSize: sizes.big,
    marginTop: 35,
  },

  phoneNumber: {
    marginTop: 15,
    fontSize: sizes.medium,
  },

  border: {
    width: 100,
  },

  fileTabs: {
    backgroundColor: palette.white,
    justifyContent: 'center',
  },
});
