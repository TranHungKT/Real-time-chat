import { StyleSheet, ViewStyle } from 'react-native';

import { COMMON_STYLES } from '@Constants/index';

interface Styles {
  safeArea: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  safeArea: {
    ...COMMON_STYLES.safeArea,
  },
});
