import { Image, FlatList, ListRenderItemInfo } from 'react-native';
import { IMessage, MessageImageProps, Bubble, BubbleProps } from 'react-native-gifted-chat';

import { styles } from './RenderMessageImageStyles';

interface RenderMessageImageProps {
  renderBubbleMessages: BubbleProps<IMessage>;
}

export const RenderMessageImage = (props: RenderMessageImageProps) => {
  const { renderBubbleMessages } = props;
  const renderImage = (imag: ListRenderItemInfo<string>) => (
    <Image source={{ uri: imag.item || '' }} style={styles.image} key={imag.index} />
  );

  const renderMessageImage = (message: MessageImageProps<IMessage>) => {
    return (
      <FlatList
        numColumns={2}
        data={message.currentMessage?.listImages}
        renderItem={renderImage}
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
