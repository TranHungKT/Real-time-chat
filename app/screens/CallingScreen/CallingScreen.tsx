import { useState, useEffect, useContext } from 'react';
import {
  EventOnAddStream,
  EventOnCandidate,
  MediaStream,
  RTCSessionDescription,
} from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { LoadingComponent } from '@Components/index';
import { SOCKET_EVENTS } from '@Constants/index';
import { VideoCallContainer } from '@Containers/index';
import { useMediaStream } from '@Hooks/useMediaStream';
import { WebSocketContext, PeerConnectionContext } from '@Providers/index';
import { currentGroupSelector } from '@Stores/groups';
import { userIdSelector } from '@Stores/user';

export const CallingScreen = () => {
  const socket = useContext(WebSocketContext);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const userId = useSelector(userIdSelector);
  const currentGroup = useSelector(currentGroupSelector);

  const peerConnection = useContext(PeerConnectionContext);
  const getMediaStream = useMediaStream();

  const sendOfferToUser = async (offer: RTCSessionDescription) => {
    socket.emit(SOCKET_EVENTS.OFFER_FOR_CALL_EVENT, {
      groupId: currentGroup?._id,
      offer: offer,
      callerId: userId,
    });
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

    // await createOfferForCalling();
  };

  const handleResetStream = () => {
    setLocalStream(null);
    setRemoteStream(null);
  };

  useEffect(() => {
    if (peerConnection) {
      peerConnection.onicecandidate = (event: EventOnCandidate) => {
        if (event.candidate) {
          socket.emit(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, {
            groupId: currentGroup?._id,
            iceCandidate: event.candidate,
          });
        }
      };
      peerConnection.onaddstream = (event: EventOnAddStream) => {
        setRemoteStream(event.stream);
      };
    }
  }, [currentGroup?._id, peerConnection, socket]);

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
