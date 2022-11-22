import { NewMessageFromSocket } from '@Models/index';
import { groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { messagesActions } from '@Stores/messages';

export const useReduxToAddNewMessage = () => {
  const dispatch = useAppDispatch();

  const handleAddNewMessageToGroup = ({ newMessage, groupId }: NewMessageFromSocket) => {
    dispatch(
      groupsActions.setLastMessage({
        message: { ...newMessage, user: newMessage.user._id.toString() },
        groupId: groupId,
      }),
    );

    dispatch(
      messagesActions.addNewMessageToCurrentGroup({
        newMessage,
        groupId,
      }),
    );
  };

  return handleAddNewMessageToGroup;
};
