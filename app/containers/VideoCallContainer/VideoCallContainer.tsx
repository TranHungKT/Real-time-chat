import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { VideoCallWhenNoCallee, VideoCallWithCallee } from '@Components/index';
import { WebSocketContext } from '@Providers/index';
import {
  getGroupIdOfCallSelector,
  getLocalStreamSelector,
  getRemoteStreamSelector,
} from '@Stores/callVideo';

export const VideoCallContainer = () => {
  const localStream = useSelector(getLocalStreamSelector);
  const remoteStream = useSelector(getRemoteStreamSelector);

  const groupId = useSelector(getGroupIdOfCallSelector);

  const socket = useContext(WebSocketContext);

  const handleToogleStream = (type: 'video' | 'audio') => {
    localStream?.getTracks().forEach((track) => {
      if (track.kind === type) {
        track.enabled = !track.enabled;
      }
    });
  };

  const handleEmitToggleStreamSocketEvent = ({
    event,
    value,
  }: {
    event: string;
    value: boolean;
  }) => {
    socket.emit(event, {
      groupId: groupId,
      isEnable: value,
    });
  };

  if (localStream && !remoteStream) {
    return <VideoCallWhenNoCallee localStream={localStream} />;
  }

  if (localStream && remoteStream) {
    return (
      <VideoCallWithCallee
        localStream={localStream}
        remoteStream={remoteStream}
        onToogleStream={handleToogleStream}
        onEmitToggleStreamSocketEvent={handleEmitToggleStreamSocketEvent}
      />
    );
  }
  return <></>;
};
