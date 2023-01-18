import { Image } from 'react-native';
import { IMessage, MessageImageProps, Bubble, BubbleProps } from 'react-native-gifted-chat';

// import { CachedImage } from '@georstat/react-native-image-cache';
import { styles } from './RenderMessageImageStyles';

interface RenderMessageImageProps {
  renderBubbleMessages: Omit<BubbleProps<IMessage>, 'renderMessageImage'>;
}

export const RenderMessageImage = (props: RenderMessageImageProps) => {
  const { renderBubbleMessages } = props;
  const renderMessageImage = (message: MessageImageProps<IMessage>) => {
    console.log('HELLOO', message.currentMessage?.image);
    return (
      <>
        {message.currentMessage?.image?.map((imag, index) => (
          <Image source={{ uri: imag || '' }} style={styles.image} key={index} />
        ))}
      </>
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
