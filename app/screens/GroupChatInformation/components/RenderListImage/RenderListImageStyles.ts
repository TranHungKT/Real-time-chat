import { ImageStyle, StyleSheet } from 'react-native';

interface Styles {
  image: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  image: {
    width: 115,
    height: 115,
    borderRadius: 30,
    margin: 5,
  },
});
