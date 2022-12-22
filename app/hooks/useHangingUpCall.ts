import { useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import {
  callVideoActions,
  getGroupIdOfCallSelector,
  getLocalStreamSelector,
} from '@Stores/callVideo';
import { currentGroupSelector } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';

export const useHangingUpCall = () => {
  const socket = useContext(WebSocketContext);

  const groupId = useSelector(getGroupIdOfCallSelector);
  const currentGroup = useSelector(currentGroupSelector);
  const localStream = useSelector(getLocalStreamSelector);

  const dispatch = useAppDispatch();
  const streamCleanUp = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.release();
    }
  }, [localStream]);

  const cleanUpTheCall = useCallback(() => {
    dispatch(callVideoActions.resetCall());
    streamCleanUp();
  }, [dispatch, streamCleanUp]);

  const handleEmitHangUpEvent = () => {
    socket.emit(SOCKET_EVENTS.HANG_UP_EVENT, {
      groupId: groupId || currentGroup?._id,
    });
  };

  const hangUpCall = () => {
    handleEmitHangUpEvent();
    cleanUpTheCall();
    streamCleanUp();
  };

  return {
    onHangUpCall: hangUpCall,
    onResetCall: cleanUpTheCall,
  };
};
