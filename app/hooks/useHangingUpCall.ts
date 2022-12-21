import { useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { callVideoActions, getGroupIdOfCallSelector } from '@Stores/callVideo';
import { useAppDispatch } from '@Stores/index';

export const useHangingUpCall = () => {
  const socket = useContext(WebSocketContext);

  const groupId = useSelector(getGroupIdOfCallSelector);

  const dispatch = useAppDispatch();

  const cleanUpTheCall = useCallback(() => {
    dispatch(callVideoActions.resetCall());
  }, [dispatch]);

  const handleResetCall = () => {
    cleanUpTheCall();
  };

  const handleEmitHangUpEvent = () => {
    socket.emit(SOCKET_EVENTS.HANG_UP_EVENT, {
      groupId: groupId,
    });
  };

  const hangUpCall = () => {
    handleEmitHangUpEvent();
    handleResetCall();
  };

  return {
    onHangUpCall: hangUpCall,
    onResetcall: handleResetCall,
  };
};
