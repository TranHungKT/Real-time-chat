import { FlatList, ListRenderItemInfo, Image } from 'react-native';

import { styles } from './RenderMoreOrEqualThreeImagesStyles';

interface RenderMoreOrEqualThreeImagesProps {
  images: string[];
}

export const RenderMoreOrEqualThreeImages = (props: RenderMoreOrEqualThreeImagesProps) => {
  const { images } = props;

  const renderImage = (item: ListRenderItemInfo<string>) => {
    return (
      <Image
        source={{ uri: item.item || '' }}
        key={item.index.toString() + item.item}
        style={styles.image}
      />
    );
  };

  return <FlatList numColumns={3} data={images} renderItem={renderImage} />;
};
