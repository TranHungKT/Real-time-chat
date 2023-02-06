import { useContext } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { ImageGalleryContext } from '@Providers/index';

import { styles } from './RenderTwoImageMessageStyles';

interface RenderTwoImageMessageProps {
  images: string[];
  isMyMessage: boolean;
}

export const RenderTwoImageMessage = (props: RenderTwoImageMessageProps) => {
  const { images, isMyMessage } = props;
  const { onClickImage } = useContext(ImageGalleryContext);

  const handleClickImage = (image: string) => () => onClickImage(image);

  if (images.length !== 2) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClickImage(images[0])}>
        <Image
          source={{ uri: images[0] }}
          style={[styles.firstImage, !isMyMessage && styles.notMyFirstImage]}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickImage(images[1])}>
        <Image
          source={{ uri: images[1] }}
          style={[styles.secondImage, !isMyMessage && styles.notMySecondImage]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};
