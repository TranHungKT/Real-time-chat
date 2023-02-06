import { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { ImageGalleryContext } from '@Providers/index';

import { styles } from './RenderOneImageMessageStyles';

interface RenderOneImageMessageProps {
  image: string;
  isMyMessage: boolean;
}

export const RenderOneImageMessage = (props: RenderOneImageMessageProps) => {
  const { image, isMyMessage } = props;

  const { onClickImage } = useContext(ImageGalleryContext);

  const handleClickImage = () => onClickImage(image);
  return (
    <TouchableOpacity onPress={handleClickImage}>
      <Image
        source={{ uri: image }}
        style={[styles.container, !isMyMessage && styles.notMyImage]}
        resizeMode="cover"
        resizeMethod="scale"
      />
    </TouchableOpacity>
  );
};
