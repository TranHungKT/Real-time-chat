import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  style: ViewStyle;
  contentContainerStyle: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  style: {
    top: 20,
    paddingRight: 40,
  },

  contentContainerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
