import {
  RTCSessionDescription,
  RTCSessionDescriptionType,
  RTCPeerConnection,
} from 'react-native-webrtc';

export const useRemoteDescription = () => {
  const onHandleRemoteDescription = async ({
    newDescription,
    peerConnection,
  }: {
    newDescription: RTCSessionDescriptionType;
    peerConnection: RTCPeerConnection;
  }) => {
    try {
      const description = new RTCSessionDescription(newDescription);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(description);
      }
    } catch (error) {
      console.log('Error add remote description', error);
    }
  };

  return onHandleRemoteDescription;
};
