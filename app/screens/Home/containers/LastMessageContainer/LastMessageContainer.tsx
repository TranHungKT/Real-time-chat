import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { Member, LastMessage } from '@Models/index';
import { userIdSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

import { styles } from './LastMessageContainerStyles';

interface LastMessageContainerProps {
  members: Member[];
  message?: LastMessage;
  hasUnReadMessage: boolean;
}

export const LastMessageContainer = (props: LastMessageContainerProps) => {
  const { message, members, hasUnReadMessage } = props;

  const userId = useSelector(userIdSelector);

  const getNameOfUser = () => {
    if (userId === message?.user) {
      return 'Me: ';
    }

    if (members.length === 2) {
      return '';
    }

    const user = members.find((member) => member._id === message?.user);

    return `${generateName({ firstName: user?.firstName, lastName: user?.lastName })}: `;
  };

  const renderText = () => {
    if (message?.image) {
      return 'Sent image';
    }
    return message?.text;
  };

  return (
    <Text
      numberOfLines={1}
      style={[styles.chat, hasUnReadMessage && styles.chatWhenHaveUnReadMessage]}
    >
      {getNameOfUser()}
      {renderText()}
    </Text>
  );
};
