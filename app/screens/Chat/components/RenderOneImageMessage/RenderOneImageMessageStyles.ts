import { ImageStyle, StyleSheet } from 'react-native';

interface Styles {
  container: ImageStyle;
  notMyImage: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    width: 220,
    height: 320,
    borderRadius: 20,
    borderTopRightRadius: 5,
  },

  notMyImage: {
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 20,
  },
});
