import { PeerConnectionContext } from 'providers/CallVideoProvider';
import { useState, useEffect, useContext } from 'react';
import {
  EventOnAddStream,
  EventOnCandidate,
  MediaStream,
  RTCSessionDescription,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import { useSelector } from 'react-redux';
import GetStreams from 'utils/getStreams';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { getGroupIdSelector, getNewOfferSelector } from '@Stores/callVideo';

import { GettingCall } from './components/GettingCall/GettingCall';
import { Video } from './components/Video/Video';

export const GettingCallScreen3 = () => {
  const socket = useContext(WebSocketContext);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [gettingCall, setGettingCall] = useState(false);

  const newOffer = useSelector(getNewOfferSelector);
  const groupId = useSelector(getGroupIdSelector);
  const peerConnection = useContext(PeerConnectionContext);

  const getMediaStream = async () => {
    const stream: MediaStream | null = await GetStreams.getStream();

    if (peerConnection && stream) {
      setLocalStream(stream);
      peerConnection.addStream(stream);
      return stream;
    }
    return null;
  };

  const handleRemoteDescription = async (newDescription: RTCSessionDescriptionType) => {
    const description = new RTCSessionDescription(newDescription);
    if (peerConnection) {
      await peerConnection.setRemoteDescription(description);
    }
  };

  const handleCreateAnswerDescription = async () => {
    if (peerConnection) {
      const answerDescription = (await peerConnection.createAnswer()) as RTCSessionDescription;

      await peerConnection.setLocalDescription(answerDescription);

      return answerDescription;
    }
  };

  const emitAnswerEvent = (answerDescription?: RTCSessionDescription) => {
    socket.emit(SOCKET_EVENTS.ANSWER_FOR_CALL_EVENT, {
      groupId: groupId,
      answer: answerDescription,
    });
  };

  const joinCall = async () => {
    try {
      if (newOffer) {
        await getMediaStream();

        await handleRemoteDescription(newOffer);
        const answerDescription = await handleCreateAnswerDescription();

        emitAnswerEvent(answerDescription);

        setGettingCall(false);
      }
    } catch (error) {
      console.log('error to join call', error);
    }
  };
  useEffect(() => {
    setGettingCall(true);
  }, []);

  useEffect(() => {
    if (peerConnection) {
      peerConnection.onicecandidate = (event: EventOnCandidate) => {
        if (event.candidate) {
          socket.emit(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, {
            groupId: groupId,
            iceCandidate: event.candidate,
          });
        }
      };
      peerConnection.onaddstream = (event: EventOnAddStream) => {
        setRemoteStream(event.stream);
      };
    }
  }, [groupId, socket, gettingCall, localStream, peerConnection]);

  if (gettingCall) {
    return <GettingCall hangUp={() => {}} join={joinCall} />;
  }
  if (localStream) {
    return <Video hangUp={() => {}} localStream={localStream} remoteStream={remoteStream} />;
  }

  return <></>;
};
