import { useSelector } from 'react-redux';

import { getMessagesForGroupSelector } from '@Stores/messages';

import { SendAndDisplayMessageContainer } from '../SendAndDisplayMessageContainer';

export const ListChatsContainer = () => {
  const groupMessages = useSelector(getMessagesForGroupSelector);

  return <SendAndDisplayMessageContainer messages={groupMessages?.messages} />;
};
