import { useContext } from 'react';
import { FlatList, ListRenderItemInfo, Image, TouchableOpacity } from 'react-native';

import { ImageGalleryContext } from '@Providers/index';

import { styles } from './RenderMoreOrEqualThreeImagesStyles';

interface RenderMoreOrEqualThreeImagesProps {
  images: string[];
}

export const RenderMoreOrEqualThreeImages = (props: RenderMoreOrEqualThreeImagesProps) => {
  const { images } = props;
  const { onClickImage } = useContext(ImageGalleryContext);
  const handleClickImage = (image: string) => () => onClickImage(image);

  const renderImage = (item: ListRenderItemInfo<string>) => {
    return (
      <TouchableOpacity onPress={handleClickImage(item.item)}>
        <Image
          source={{ uri: item.item || '' }}
          key={item.index.toString() + item.item}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  return <FlatList numColumns={3} data={images} renderItem={renderImage} />;
};
