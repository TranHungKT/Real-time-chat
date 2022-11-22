import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  chatFooter: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  chatFooter: {
    marginBottom: 10,
  },
});
