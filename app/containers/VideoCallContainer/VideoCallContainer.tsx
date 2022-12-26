import { useSelector } from 'react-redux';

import { VideoCallWhenNoCallee, VideoCallWithCallee } from '@Components/index';
import { getLocalStreamSelector, getRemoteStreamSelector } from '@Stores/callVideo';

export const VideoCallContainer = () => {
  const localStream = useSelector(getLocalStreamSelector);
  const remoteStream = useSelector(getRemoteStreamSelector);

  const handleToogleStream = (type: 'video' | 'audio') => () => {
    localStream?.getTracks().forEach((track) => {
      if (track.kind === type) {
        track.enabled = !track.enabled;
      }
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
      />
    );
  }
  return <></>;
};
