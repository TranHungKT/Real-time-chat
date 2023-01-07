import { ImageStyle, StyleSheet } from 'react-native';

interface Styles {
  avatar: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  avatar: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginTop: 2,
    overflow: 'hidden',
  },
});
