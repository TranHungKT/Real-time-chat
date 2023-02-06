import { IMessage, MessageImageProps, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { RenderMessageImage } from 'screens/Chat/components';

import { userIdSelector } from '@Stores/user';

import { styles } from './RenderMessageImagesContainerStyles';

interface RenderMessageImagesContainerProps {
  renderBubbleMessages: BubbleProps<IMessage>;
}

export const RenderMessageImagesContainer = (props: RenderMessageImagesContainerProps) => {
  const { renderBubbleMessages } = props;
  const userId = useSelector(userIdSelector);

  const renderMessageImage = (message: MessageImageProps<IMessage>) => {
    return <RenderMessageImage userId={userId} message={message} />;
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
