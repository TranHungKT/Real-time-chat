import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  video: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
