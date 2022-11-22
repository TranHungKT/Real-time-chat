import { UpdateMessageStatusPayload } from '@Models/index';
import { groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { messagesActions } from '@Stores/messages';

export const useReduxToUpdateMessageStatus = () => {
  const dispatch = useAppDispatch();

  const handleUpdateMessageStatus = (payload: UpdateMessageStatusPayload) => {
    dispatch(messagesActions.updateMessageStatus(payload));
    dispatch(groupsActions.updateLastMessageStatus(payload));
  };

  return [handleUpdateMessageStatus];
};
