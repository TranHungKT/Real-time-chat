import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  itemStyle: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  itemStyle: {
    flex: 1 / 3,
    width: 100,
    height: 100,
  },
});
