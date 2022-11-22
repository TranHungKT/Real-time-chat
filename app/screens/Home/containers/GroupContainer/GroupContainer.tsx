import { map } from 'lodash';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PAGE_SIZE, SOCKET_EVENTS } from '@Constants/index';
import { useReduxToUpdateMessageStatus } from '@Hooks/useReduxToUpdateMessageStatus';
import { Group as IGroup, MessageStatus } from '@Models/index';
import { WebSocketContext } from '@Providers/index';
import { fetchListMessages } from '@Services/index';
import { useAppDispatch } from '@Stores/index';
import { getMessagesUnSeenOrReceivedByGroupIdSelector, messagesActions } from '@Stores/messages';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { RenderGroupContainer } from '../RenderGroupContainer';

interface GroupContainerProps {
  group: IGroup;
}

export const GroupContainer = (props: GroupContainerProps) => {
  const { group } = props;

  const dispatch = useAppDispatch();
  const socket = useContext(WebSocketContext);
  const accessToken = useSelector(userTokenSelector);

  const groupMessagesUnReceivedSelector = useSelector(getMessagesUnSeenOrReceivedByGroupIdSelector);

  const groupMessagesUnReceived = groupMessagesUnReceivedSelector({
    groupId: group._id,
    status: MessageStatus.RECEIVED,
  });

  const [handleUpdateMessageStatus] = useReduxToUpdateMessageStatus();

  const { data: listMessages } = useQuery(['fetchListMessages', group._id], () =>
    fetchListMessages({
      token: accessToken,
      pageNumber: 1,
      pageSize: PAGE_SIZE,
      groupId: group._id,
    }),
  );

  useEffect(() => {
    if (groupMessagesUnReceived && groupMessagesUnReceived.length) {
      const groupMessagesUnReceivedIds = map(groupMessagesUnReceived, '_id');

      socket.emit(SOCKET_EVENTS.RECEIVED_MESSAGE, {
        groupId: group._id,
        messageIds: groupMessagesUnReceivedIds,
      });

      handleUpdateMessageStatus({
        groupId: group._id,
        messageIds: groupMessagesUnReceivedIds as string[],
        status: MessageStatus.RECEIVED,
      });
    }
  }, [group._id, groupMessagesUnReceived, handleUpdateMessageStatus, socket]);

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

  return <RenderGroupContainer group={group} />;
};
