import { Image, FlatList } from 'react-native';
import { IMessage, MessageImageProps, Bubble, BubbleProps } from 'react-native-gifted-chat';

import { styles } from './RenderMessageImageStyles';

interface RenderMessageImageProps {
  renderBubbleMessages: Omit<BubbleProps<IMessage>, 'renderMessageImage'>;
}

export const RenderMessageImage = (props: RenderMessageImageProps) => {
  const { renderBubbleMessages } = props;
  const renderMessageImage = (message: MessageImageProps<IMessage>) => {
    return (
      <FlatList
        numColumns={2}
        data={message.currentMessage?.listImages}
        renderItem={(imag) => (
          <Image source={{ uri: imag.item || '' }} style={styles.image} key={imag.index} />
        )}
        style={styles.listImages}
      />
    );
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
