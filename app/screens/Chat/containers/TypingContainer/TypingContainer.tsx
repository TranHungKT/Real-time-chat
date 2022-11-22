import TypingIndicator from 'react-native-gifted-chat/lib/TypingIndicator';
import { useSelector } from 'react-redux';

import { getIsTypingUserSelector } from '@Stores/groups';

interface TypingContainerProps {
  groupId: string;
  isTyping: boolean;
}

export const TypingContainer = (props: TypingContainerProps) => {
  const { groupId, isTyping } = props;

  const getIsTypingUser = useSelector(getIsTypingUserSelector);

  const users = getIsTypingUser({ groupId });

  return (
    <>
      {users.map((user) => (
        <TypingIndicator isTyping={isTyping} key={user._id} />
      ))}
    </>
  );
};
