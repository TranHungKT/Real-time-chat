import { MediaStream, RTCPeerConnection } from 'react-native-webrtc';

import GetStreams from '@Utils/getStreams';

export const useMediaStream = () => {
  const getMediaStream = async (peerConnection: RTCPeerConnection) => {
    const stream: MediaStream | null = await GetStreams.getStream();

    if (peerConnection && stream) {
      peerConnection.addStream(stream);
      return stream;
    }
    return null;
  };

  return getMediaStream;
};
