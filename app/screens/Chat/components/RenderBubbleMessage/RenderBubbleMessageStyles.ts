import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  bubbleMessageView: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  bubbleMessageView: {
    alignItems: 'flex-end',
  },
});
