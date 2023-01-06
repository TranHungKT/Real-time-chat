import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PAGE_SIZE } from '@Constants/index';
import { fetchListMessages } from '@Services/index';
import { currentGroupSelector } from '@Stores/groups';
import { getMessagesForGroupSelector, messagesActions } from '@Stores/messages';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { SendAndDisplayMessageContainer } from '../SendAndDisplayMessageContainer';

export const ListChatsContainer = () => {
  const groupMessages = useSelector(getMessagesForGroupSelector);
  const accessToken = useSelector(userTokenSelector);
  const currentGroup = useSelector(currentGroupSelector);

  const [refetch, setRefetch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  const { data: listMessages, isSuccess } = useQuery(
    ['fetchListMessagesAgain', currentGroup?._id, pageNumber],
    () =>
      fetchListMessages({
        token: accessToken,
        pageNumber: pageNumber,
        pageSize: PAGE_SIZE,
        groupId: currentGroup?._id,
      }),
    { enabled: refetch },
  );

  const handleLoadEarlierMessages = () => {
    setPageNumber(pageNumber + 1);
    setRefetch(true);
  };

  useEffect(() => {
    if (listMessages) {
      dispatch(
        messagesActions.setMessages({
          count: listMessages.count,
          list: listMessages.list,
          groupId: listMessages.groupId,
        }),
      );
    }
  }, [dispatch, listMessages]);

  useEffect(() => {
    if (isSuccess) {
      setRefetch(false);
    }
  }, [isSuccess]);

  return (
    <SendAndDisplayMessageContainer
      messages={groupMessages?.messages}
      onLoadEarlierMessages={handleLoadEarlierMessages}
    />
  );
};
