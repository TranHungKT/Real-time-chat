import { View, Image } from 'react-native';

import { styles } from './RenderTwoImageMessageStyles';

interface RenderTwoImageMessageProps {
  images: string[];
  isMyMessage: boolean;
}

export const RenderTwoImageMessage = (props: RenderTwoImageMessageProps) => {
  const { images, isMyMessage } = props;

  if (images.length !== 2) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: images[0] }}
        style={[styles.firstImage, !isMyMessage && styles.notMyFirstImage]}
        resizeMode="cover"
      />
      <Image
        source={{ uri: images[1] }}
        style={[styles.secondImage, !isMyMessage && styles.notMySecondImage]}
        resizeMode="cover"
      />
    </View>
  );
};
