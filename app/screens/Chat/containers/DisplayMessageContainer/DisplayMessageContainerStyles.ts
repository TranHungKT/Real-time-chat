import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  chatFooter: ViewStyle;
  scollBottomStyle: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  chatFooter: {
    marginBottom: 10,
  },
  scollBottomStyle: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: -20,
  },
});
