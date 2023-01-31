import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';

const IMAGE_WIDTH = 125;
const IMAGE_HEIGHT = 125;
interface Styles {
  container: ViewStyle;
  firstImage: ImageStyle;
  notMyFirstImage: ImageStyle;
  secondImage: ImageStyle;
  notMySecondImage: ImageStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
  },

  firstImage: {
    borderRadius: 5,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginRight: 2,
  },

  notMyFirstImage: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  secondImage: {
    borderRadius: 5,
    borderTopRightRadius: 15,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },

  notMySecondImage: {
    borderBottomRightRadius: 15,
  },
});
