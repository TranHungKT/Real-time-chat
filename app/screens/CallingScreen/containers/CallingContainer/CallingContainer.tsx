import { useState, useEffect, useContext } from 'react';
import {
  EventOnAddStream,
  EventOnCandidate,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidateType,
} from 'react-native-webrtc';

import { LoadingComponent } from '@Components/index';
import { VideoCallContainer } from '@Containers/index';
import { useMediaStream } from '@Hooks/useMediaStream';
import { PeerConnectionContext } from '@Providers/index';

interface CallingContainerProps {
  onHanldeSendOffer: (offer: RTCSessionDescription) => void;
  onHandleSendIceCandidate: (iceCandidate: RTCIceCandidateType) => void;
}

export const CallingContainer = (props: CallingContainerProps) => {
  const { onHandleSendIceCandidate, onHanldeSendOffer } = props;

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const peerConnection = useContext(PeerConnectionContext);
  const getMediaStream = useMediaStream();

  const sendOfferToUser = async (offer: RTCSessionDescription) => {
    onHanldeSendOffer(offer);
  };

  const createOfferForCalling = async () => {
    if (peerConnection) {
      const offerDescription = (await peerConnection.createOffer()) as RTCSessionDescription;
      await peerConnection.setLocalDescription(offerDescription);

      sendOfferToUser(offerDescription);
    }
  };

  const createCall = async () => {
    const stream = await getMediaStream(peerConnection);

    if (stream) {
      setLocalStream(stream);
    }

    await createOfferForCalling();
  };

  const handleResetStream = () => {
    setLocalStream(null);
    setRemoteStream(null);
  };

  useEffect(() => {
    if (peerConnection) {
      peerConnection.onicecandidate = (event: EventOnCandidate) => {
        if (event.candidate) {
          onHandleSendIceCandidate(event.candidate);
        }
      };
      peerConnection.onaddstream = (event: EventOnAddStream) => {
        setRemoteStream(event.stream);
      };
    }
  }, [onHandleSendIceCandidate, peerConnection]);

  useEffect(() => {
    createCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (localStream) {
    return (
      <VideoCallContainer
        onHandleResetStream={handleResetStream}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  }

  return <LoadingComponent />;
};
