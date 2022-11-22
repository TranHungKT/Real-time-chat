import { StyleSheet, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';

import { paddingHorizontalSpace } from '@Themes/index';

interface Style {
  container: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: hasNotch() ? 100 : 70,
    left: paddingHorizontalSpace,
    width: '100%',
    height: 40,
    alignContent: 'center',
  },
});
