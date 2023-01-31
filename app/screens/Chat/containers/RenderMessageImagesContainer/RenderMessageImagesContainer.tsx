import { IMessage, MessageImageProps, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import {
  RenderOneImageMessage,
  RenderTwoImageMessage,
  RenderMoreOrEqualThreeImages,
} from 'screens/Chat/components';

import { userIdSelector } from '@Stores/user';

import { styles } from './RenderMessageImagesContainerStyles';

interface RenderMessageImagesContainerProps {
  renderBubbleMessages: BubbleProps<IMessage>;
}

export const RenderMessageImagesContainer = (props: RenderMessageImagesContainerProps) => {
  const { renderBubbleMessages } = props;
  const userId = useSelector(userIdSelector);

  const isMyMessage = (id?: string | number) => userId === id;

  const renderMessageImage = (message: MessageImageProps<IMessage>) => {
    if (!message.currentMessage) {
      return <></>;
    }
    const { listImages, user } = message.currentMessage;
    switch (listImages?.length) {
      case 1: {
        return <RenderOneImageMessage image={listImages[0]} isMyMessage={isMyMessage(user?._id)} />;
      }

      case 2: {
        return <RenderTwoImageMessage images={listImages} isMyMessage={isMyMessage(user?._id)} />;
      }
      default:
        return <RenderMoreOrEqualThreeImages images={listImages || []} />;
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
