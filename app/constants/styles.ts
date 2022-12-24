import { StyleSheet, ViewStyle, StatusBar, Platform, Dimensions } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  safeArea: ViewStyle;
}

export const COMMON_STYLES = StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
    backgroundColor: palette.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
