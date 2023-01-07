import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PAGE_SIZE } from '@Constants/index';
import { fetchListMessages } from '@Services/index';
import { currentGroupSelector } from '@Stores/groups';
import {
  getCurrentPageSelector,
  getMessagesForGroupSelector,
  messagesActions,
} from '@Stores/messages';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { SendAndDisplayMessageContainer } from '../SendAndDisplayMessageContainer';

export const ListChatsContainer = () => {
  const groupMessages = useSelector(getMessagesForGroupSelector);
  const accessToken = useSelector(userTokenSelector);
  const currentGroup = useSelector(currentGroupSelector);
  const currentPageSelector = useSelector(getCurrentPageSelector);
  const currentPage = currentPageSelector({ groupId: currentGroup?._id || '' });

  const dispatch = useDispatch();

  const [isRefetch, setIsRefetch] = useState(false);

  const { data: listMessages } = useQuery(
    ['fetchListMessagesAgain', currentGroup?._id, currentPage],
    () =>
      fetchListMessages({
        token: accessToken,
        pageNumber: currentPage + 1,
        pageSize: PAGE_SIZE,
        groupId: currentGroup?._id,
      }),
    { enabled: isRefetch, refetchOnMount: false },
  );

  const handleLoadEarlierMessages = () => setIsRefetch(true);

  useEffect(() => {
    if (listMessages && isRefetch) {
      dispatch(
        messagesActions.setMessages({
          count: listMessages.count,
          list: listMessages.list,
          groupId: listMessages.groupId,
          currentPage: currentPage + 1,
        }),
      );
      setIsRefetch(false);
    }
  }, [dispatch, listMessages, isRefetch, currentPage]);

  return (
    <SendAndDisplayMessageContainer
      messages={groupMessages?.messages}
      count={groupMessages?.count}
      onLoadEarlierMessages={handleLoadEarlierMessages}
    />
  );
};
