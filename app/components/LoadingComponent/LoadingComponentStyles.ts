import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  activity: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  activity: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
