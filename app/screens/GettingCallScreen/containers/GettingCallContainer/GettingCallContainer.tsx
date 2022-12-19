import { PeerConnectionContext } from 'providers/CallVideoProvider';
import { useState, useEffect, useContext } from 'react';
import {
  EventOnAddStream,
  EventOnCandidate,
  MediaStream,
  RTCSessionDescription,
  RTCSessionDescriptionType,
  RTCIceCandidateType,
} from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { VideoCallContainer } from '@Containers/index';
import { useMediaStream } from '@Hooks/useMediaStream';
import { useRemoteDescription } from '@Hooks/useRemoteDescription';
import { getNewOfferSelector } from '@Stores/callVideo';

import { GettingCall } from '../../components/GettingCall/GettingCall';

interface GettingCallContainerProps {
  onHandleEmitAnswerEvent: (answerDescription?: RTCSessionDescription) => void;
  onHandleEmitIceCandidate: (iceCandidate: RTCIceCandidateType) => void;
}

export const GettingCallContainer = (props: GettingCallContainerProps) => {
  const { onHandleEmitAnswerEvent, onHandleEmitIceCandidate } = props;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isGettingCall, setIsGettingCall] = useState(true);

  const { offer: newOffer, groupId } = useSelector(getNewOfferSelector);

  const peerConnection = useContext(PeerConnectionContext);

  const getMediaStream = useMediaStream();
  const onHandleRemoteDescription = useRemoteDescription();

  const handleRemoteDescription = async (newDescription: RTCSessionDescriptionType) => {
    onHandleRemoteDescription({ newDescription, peerConnection });
  };

  const handleCreateAnswerDescription = async () => {
    if (peerConnection) {
      const answerDescription = (await peerConnection.createAnswer()) as RTCSessionDescription;

      await peerConnection.setLocalDescription(answerDescription);

      return answerDescription;
    }
  };

  const handleLocalStream = async () => {
    const stream = await getMediaStream(peerConnection);
    if (stream) {
      setLocalStream(stream);
    }
  };

  const handleSendAnswer = async () => {
    const answerDescription = await handleCreateAnswerDescription();

    onHandleEmitAnswerEvent(answerDescription);
  };

  const joinCall = async () => {
    try {
      if (newOffer) {
        await handleLocalStream();
        await handleRemoteDescription(newOffer);
        await handleSendAnswer();

        setIsGettingCall(false);
      }
    } catch (error) {
      console.log('error to join call', error);
    }
  };

  const streamCleanUp = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };

  const closePeerConnection = () => {
    if (peerConnection) {
      peerConnection.close();
    }
  };

  const hangUp = () => {
    streamCleanUp();
    closePeerConnection();
  };

  const handleResetStream = () => {
    setLocalStream(null);
    setRemoteStream(null);
  };

  useEffect(() => {
    if (peerConnection) {
      peerConnection.onicecandidate = (event: EventOnCandidate) => {
        if (event.candidate) {
          onHandleEmitIceCandidate(event.candidate);
        }
      };
      peerConnection.onaddstream = (event: EventOnAddStream) => {
        setRemoteStream(event.stream);
      };
    }
  }, [groupId, onHandleEmitIceCandidate, peerConnection]);

  if (isGettingCall) {
    return <GettingCall hangUp={hangUp} join={joinCall} />;
  }
  if (localStream) {
    return (
      <VideoCallContainer
        onHandleResetStream={handleResetStream}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  }

  return <></>;
};
