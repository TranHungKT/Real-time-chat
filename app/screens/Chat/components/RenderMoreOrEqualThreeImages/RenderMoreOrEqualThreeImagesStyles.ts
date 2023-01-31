import { ImageStyle, StyleSheet } from 'react-native';

interface Styles {
  image: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  image: {
    minWidth: 75,
    minHeight: 75,
    borderRadius: 5,
    marginBottom: 1.5,
    overflow: 'hidden',
    marginHorizontal: 1.5,
  },
});
