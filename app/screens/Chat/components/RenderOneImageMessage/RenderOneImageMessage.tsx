import { Image } from 'react-native';

import { styles } from './RenderOneImageMessageStyles';

interface RenderOneImageMessageProps {
  image: string;
}

export const RenderOneImageMessage = (props: RenderOneImageMessageProps) => {
  const { image } = props;
  return <Image source={{ uri: image }} style={styles.container} resizeMode="cover" />;
};
