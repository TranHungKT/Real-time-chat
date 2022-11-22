import { StyleSheet, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';

import { COMMON_STYLES } from '@Constants/index';
import { paddingHorizontalSpace } from '@Themes/index';

interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
  activityIndicator: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  safeArea: {
    ...COMMON_STYLES.safeArea,
  },
  container: {
    paddingHorizontal: paddingHorizontalSpace,
    flex: 1,
  },
  content: {
    marginTop: hasNotch() ? 60 : 50,
  },
  activityIndicator: {
    flex: 1,
    alignSelf: 'center',
  },
});
