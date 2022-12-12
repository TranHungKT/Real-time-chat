import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { LastMessage } from '@Models/index';
import { getAvatarOfSeenUser } from '@Stores/groups';
import { userIdSelector } from '@Stores/user';

import { styles } from './UnReadMessageContainerStyles';

interface UnReadMessageContainerProps {
  numberOfUnReadMessage: number;
  senderOfLastMessage?: string;
  lastMessage?: LastMessage;
  groupId: string;
}
export const UnReadMessageContainer = (props: UnReadMessageContainerProps) => {
  const { numberOfUnReadMessage, senderOfLastMessage, lastMessage, groupId } = props;

  const userId = useSelector(userIdSelector);
  const avatarUrlSelector = useSelector(getAvatarOfSeenUser);
  const avatar = avatarUrlSelector({ groupId });

  const renderSeen = () => {
    if (lastMessage?.seen) {
      return <Image source={{ uri: avatar }} style={styles.avatar} />;
    }

    return (
      <View style={styles.tickView}>
        {!!lastMessage?.sent && <Text style={styles.tick}>✓</Text>}
        {!!lastMessage?.received && <Text style={styles.tick}>✓</Text>}
      </View>
    );
  };

  const getTextUnReadMessages = () => {
    if (userId === senderOfLastMessage) {
      return renderSeen();
    }

    if (numberOfUnReadMessage === 0) {
      return undefined;
    }

    if (numberOfUnReadMessage < 10) {
      return <Text style={styles.numberOfUnReadMessageText}>{numberOfUnReadMessage}</Text>;
    }

    return <Text style={styles.numberOfUnReadMessageText}>9+</Text>;
  };

  return (
    <View
      style={[
        styles.numberOfUnReadMessageView,
        numberOfUnReadMessage === 0 && styles.numberOfUnReadMessageEqualZeroView,
      ]}
    >
      {getTextUnReadMessages()}
    </View>
  );
};
