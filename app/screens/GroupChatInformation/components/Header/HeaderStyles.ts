import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  icon: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  icon: {
    marginLeft: -10,
  },
});
