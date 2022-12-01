import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  groupAvatar: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  groupAvatar: {
    justifyContent: 'flex-start',
  },
});
