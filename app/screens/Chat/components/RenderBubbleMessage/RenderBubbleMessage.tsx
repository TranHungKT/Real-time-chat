import { View } from 'react-native';
import { IMessage, BubbleProps, Bubble } from 'react-native-gifted-chat';

import { RenderMessageImagesContainer } from '../../containers/RenderMessageImagesContainer/RenderMessageImagesContainer';
import { RenderSeenContainer } from '../../containers/RenderSeenContainer';
import { RenderTicks } from '../RenderTicks';
import { styles } from './RenderBubbleMessageStyles';

interface RenderBubbleMessageProps {
  bubbleMessages: BubbleProps<IMessage>;
  userId: string;
  groupId: string;
}

export const RenderBubbleMessage = (props: RenderBubbleMessageProps) => {
  const { bubbleMessages, userId, groupId } = props;

  const renderBubble = () => {
    if (bubbleMessages.currentMessage && bubbleMessages.currentMessage.image) {
      return <RenderMessageImagesContainer renderBubbleMessages={bubbleMessages} />;
    }
    return <Bubble {...bubbleMessages} renderTicks={() => <></>} />;
  };

  return (
    <View style={styles.bubbleMessageView}>
      {renderBubble()}
      <RenderTicks bubbleMessages={bubbleMessages} userId={userId} />
      <RenderSeenContainer bubbleMessages={bubbleMessages} userId={userId} groupId={groupId} />
    </View>
  );
};
