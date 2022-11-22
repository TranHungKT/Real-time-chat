import { Image } from 'react-native';
import { IMessage, MessageImageProps, Bubble, BubbleProps } from 'react-native-gifted-chat';

import { styles } from './RenderMessageImageStyles';

interface RenderMessageImageProps {
  renderBubbleMessages: BubbleProps<IMessage>;
}

export const RenderMessageImage = (props: RenderMessageImageProps) => {
  const { renderBubbleMessages } = props;

  const renderMessageImage = (message: MessageImageProps<IMessage>) => {
    return <Image source={{ uri: message.currentMessage?.image }} style={styles.image} />;
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
