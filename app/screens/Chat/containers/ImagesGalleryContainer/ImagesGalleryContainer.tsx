import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { useSelector } from 'react-redux';

import { getImagesForCurrentGroupSelector } from '@Stores/messages';

interface ImagesGalleryContainerProps {
  currentImage: string;
  isVisible: boolean;
  onCloseImage: () => void;
}

const KEY_CHAT_IMAGE_VIEW = 'KEY_CHAT_IMAGE_VIEW';

export const ImagesGalleryContainer = (props: ImagesGalleryContainerProps) => {
  const { isVisible, currentImage, onCloseImage } = props;

  const listImages = useSelector(getImagesForCurrentGroupSelector);

  const getImageIndex = () => {
    const index = listImages?.findIndex((image) => image === currentImage);
    if (index === -1 || index === undefined) {
      return 1;
    }
    return index;
  };

  if (!listImages) {
    return <></>;
  }

  const getListImagesWithUri = () => listImages.map((image) => ({ uri: image }));
  const getKeyExtractorForImagesView = (item: ImageSource, index: number) =>
    item.uri + index + KEY_CHAT_IMAGE_VIEW;

  return (
    <ImageView
      visible={isVisible}
      images={getListImagesWithUri()}
      imageIndex={getImageIndex()}
      onRequestClose={onCloseImage}
      keyExtractor={getKeyExtractorForImagesView}
    />
  );
};
