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

import { Video } from '@Components/index';
import { SOCKET_EVENTS } from '@Constants/index';
import { useMediaStream } from '@Hooks/useMediaStream';
import { WebSocketContext } from '@Providers/index';
import { getGroupIdSelector, getNewOfferSelector } from '@Stores/callVideo';

import { GettingCall } from './components/GettingCall/GettingCall';

export const GettingCallScreen = () => {
  const socket = useContext(WebSocketContext);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [gettingCall, setGettingCall] = useState(false);

  const newOffer = useSelector(getNewOfferSelector);
  const groupId = useSelector(getGroupIdSelector);
  const peerConnection = useContext(PeerConnectionContext);

  const getMediaStream = useMediaStream();

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
        const stream = await getMediaStream(peerConnection);
        if (stream) {
          setLocalStream(stream);
        }

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
