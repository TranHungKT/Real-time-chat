import { Image, TouchableOpacity } from 'react-native';

import { styles } from './RenderListImageStyles';

interface RenderListImageProps {
  item: {
    id: string;
    image: string;
  };

  onPressImage: () => void;
}

export const RenderListImage = (props: RenderListImageProps) => {
  const { item, onPressImage } = props;
  return (
    <TouchableOpacity onPress={onPressImage}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};
