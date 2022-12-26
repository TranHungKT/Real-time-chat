import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    margin: 0,
  },
});
