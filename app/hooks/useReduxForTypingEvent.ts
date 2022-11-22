import { TypingEventPayload } from '@Models/index';
import { groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';

export const useReduxForTypingEvent = () => {
  const dispatch = useAppDispatch();
  const handleTypingEvent = (payload: TypingEventPayload) => {
    dispatch(groupsActions.setTypingEvent(payload));
  };

  const handleUnTypingEvent = (payload: TypingEventPayload) => {
    dispatch(groupsActions.unTypingEvent(payload));
  };

  return [handleTypingEvent, handleUnTypingEvent];
};
