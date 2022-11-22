import { View, Image } from 'react-native';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { getAvatarOfSeenUser } from '@Stores/groups';

import { styles } from './RenderSeenContainerStyles';

interface RenderSeenContainerProps {
  userId: string;
  bubbleMessages?: BubbleProps<IMessage>;
  groupId: string;
}

export const RenderSeenContainer = (props: RenderSeenContainerProps) => {
  const { bubbleMessages, userId, groupId } = props;

  const avatarUrlSelector = useSelector(getAvatarOfSeenUser);

  const avatarUrl = avatarUrlSelector({ groupId });

  if (bubbleMessages?.nextMessage?.seen) {
    return null;
  }

  if (bubbleMessages?.currentMessage?.user._id !== userId) {
    return null;
  }

  return (
    <View>
      {!!bubbleMessages?.currentMessage.seen && (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      )}
    </View>
  );
};
