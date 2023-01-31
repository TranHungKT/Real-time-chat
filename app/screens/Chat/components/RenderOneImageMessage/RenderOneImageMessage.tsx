import { Image } from 'react-native';

import { styles } from './RenderOneImageMessageStyles';

interface RenderOneImageMessageProps {
  image: string;
  isMyMessage: boolean;
}

export const RenderOneImageMessage = (props: RenderOneImageMessageProps) => {
  const { image, isMyMessage } = props;
  return (
    <Image
      source={{ uri: image }}
      style={[styles.container, !isMyMessage && styles.notMyImage]}
      resizeMode="cover"
      resizeMethod="scale"
    />
  );
};
