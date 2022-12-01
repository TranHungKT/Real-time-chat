import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  icon: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  icon: {
    flex: 0.2,
    alignItems: 'center',
  },
});
