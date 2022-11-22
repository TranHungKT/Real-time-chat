import { View, Text } from 'react-native';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';

import { styles } from './RenderTicksStyles';

interface RenderTicksProps {
  userId: string;
  bubbleMessages?: BubbleProps<IMessage>;
}

export const RenderTicks = (props: RenderTicksProps) => {
  const { bubbleMessages, userId } = props;

  if (bubbleMessages?.currentMessage?.seen) {
    return null;
  }

  if (
    bubbleMessages?.nextMessage?.seen ||
    bubbleMessages?.nextMessage?.sent ||
    bubbleMessages?.nextMessage?.received
  ) {
    return null;
  }

  if (bubbleMessages?.currentMessage?.user._id !== userId) {
    return null;
  }

  return (
    <View style={styles.ticksView}>
      {!!bubbleMessages?.currentMessage.sent && <Text style={styles.ticks}>✓</Text>}
      {!!bubbleMessages?.currentMessage.received && <Text style={styles.ticks}>✓</Text>}
      {!!bubbleMessages?.currentMessage.pending && <Text style={styles.ticks}>🕓</Text>}
    </View>
  );
};
