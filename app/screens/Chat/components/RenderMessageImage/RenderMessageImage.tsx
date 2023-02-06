import { useState } from 'react';
import { IMessage, MessageImageProps } from 'react-native-gifted-chat';

import { ImagesGalleryContainer } from '../../containers/ImagesGalleryContainer';
import { RenderMoreOrEqualThreeImages } from '../RenderMoreOrEqualThreeImages/RenderMoreOrEqualThreeImages';
import { RenderOneImageMessage } from '../RenderOneImageMessage/RenderOneImageMessage';
import { RenderTwoImageMessage } from '../RenderTwoImageMessage/RenderTwoImageMessage';

interface RenderMessageImageProps {
  message: MessageImageProps<IMessage>;
  userId: string;
}

export const RenderMessageImage = (props: RenderMessageImageProps) => {
  const { message, userId } = props;

  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState('');

  const handleOpenModalImage = () => setIsVisibleImage(true);
  const handleCloseModalImage = () => setIsVisibleImage(false);

  const handleClickImage = (uri: string) => {
    setCurrentImageUri(uri);
    handleOpenModalImage();
  };

  if (!message.currentMessage) {
    return <></>;
  }

  const isMyMessage = (id?: string | number) => userId === id;

  const { listImages, user } = message.currentMessage;
  const renderImages = () => {
    switch (listImages?.length) {
      case 1: {
        return (
          <RenderOneImageMessage
            image={listImages[0]}
            isMyMessage={isMyMessage(user?._id)}
            onClickImage={handleClickImage}
          />
        );
      }
      case 2: {
        return (
          <RenderTwoImageMessage
            images={listImages}
            isMyMessage={isMyMessage(user?._id)}
            onClickImage={handleClickImage}
          />
        );
      }
      default:
        return (
          <RenderMoreOrEqualThreeImages images={listImages || []} onClickImage={handleClickImage} />
        );
    }
  };

  return (
    <>
      {renderImages()}
      <ImagesGalleryContainer
        currentImage={currentImageUri}
        onCloseImage={handleCloseModalImage}
        isVisible={isVisibleImage}
      />
    </>
  );
};
