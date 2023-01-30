import { Image, FlatList, ListRenderItemInfo } from 'react-native';
import { IMessage, MessageImageProps, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { RenderOneImageMessage } from 'screens/Chat/components';

import { styles } from './RenderMessageImagesContainerStyles';

interface RenderMessageImagesContainerProps {
  renderBubbleMessages: BubbleProps<IMessage>;
}

export const RenderMessageImagesContainer = (props: RenderMessageImagesContainerProps) => {
  const { renderBubbleMessages } = props;
  const renderImage = (imag: ListRenderItemInfo<string>) => (
    <Image source={{ uri: imag.item || '' }} style={styles.image} key={imag.index} />
  );

  const renderMessageImage = (message: MessageImageProps<IMessage>) => {
    switch (message.currentMessage?.listImages?.length) {
      case 1: {
        return <RenderOneImageMessage image={message.currentMessage.listImages[0]} />;
      }
      default:
        return (
          <FlatList
            numColumns={2}
            data={message.currentMessage?.listImages}
            renderItem={renderImage}
            style={styles.listImages}
          />
        );
    }
  };

  return (
    <Bubble
      {...renderBubbleMessages}
      isCustomViewBottom={true}
      renderMessageImage={renderMessageImage}
      renderTicks={() => <></>}
      wrapperStyle={{
        left: styles.wrapperImageStyle,
        right: styles.wrapperImageStyle,
      }}
    />
  );
};
