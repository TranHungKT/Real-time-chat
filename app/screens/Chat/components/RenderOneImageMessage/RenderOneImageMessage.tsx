import { Image, TouchableOpacity } from 'react-native';

import { styles } from './RenderOneImageMessageStyles';

interface RenderOneImageMessageProps {
  image: string;
  isMyMessage: boolean;
  onClickImage: (image: string) => void;
}

export const RenderOneImageMessage = (props: RenderOneImageMessageProps) => {
  const { image, isMyMessage, onClickImage } = props;

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
