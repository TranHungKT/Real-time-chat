import { View } from 'react-native';
import { IMessage, BubbleProps, Bubble } from 'react-native-gifted-chat';

import { RenderSeenContainer } from '../../containers/RenderSeenContainer';
import { RenderMessageImage } from '../RenderMessageImage';
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
      return <RenderMessageImage renderBubbleMessages={bubbleMessages} />;
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
