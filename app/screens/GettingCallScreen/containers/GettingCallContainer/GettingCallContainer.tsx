import { ModalVideoCall } from 'components';
import { PeerConnectionContext } from 'providers/CallVideoProvider';
import { useState, useEffect, useContext } from 'react';
import {
  EventOnAddStream,
  EventOnCandidate,
  RTCSessionDescription,
  RTCSessionDescriptionType,
  RTCIceCandidateType,
} from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { useHangingUpCall } from '@Hooks/useHangingUpCall';
import { useMediaStream } from '@Hooks/useMediaStream';
import { useRemoteDescription } from '@Hooks/useRemoteDescription';
import { callVideoActions, getNewOfferSelector } from '@Stores/callVideo';
import { useAppDispatch } from '@Stores/index';

import { GettingCall } from '../../components/GettingCall/GettingCall';

interface GettingCallContainerProps {
  onHandleEmitAnswerEvent: (answerDescription?: RTCSessionDescription) => void;
  onHandleEmitIceCandidate: (iceCandidate: RTCIceCandidateType) => void;
}

export const GettingCallContainer = (props: GettingCallContainerProps) => {
  const { onHandleEmitAnswerEvent, onHandleEmitIceCandidate } = props;

  const [isVisibleGettingCall, setIsVisbleGettingCall] = useState(false);

  const { offer: newOffer, groupId, isGettingCall } = useSelector(getNewOfferSelector);
  const dispatch = useAppDispatch();
  const peerConnection = useContext(PeerConnectionContext);

  const { onHangUpCall } = useHangingUpCall();

  const getMediaStream = useMediaStream();
  const onHandleRemoteDescription = useRemoteDescription();

  const handleRemoteDescription = async (newDescription: RTCSessionDescriptionType) => {
    onHandleRemoteDescription({ newDescription, peerConnection });
  };
  useEffect(() => {
    if (isGettingCall) {
      return setIsVisbleGettingCall(true);
    }
    return setIsVisbleGettingCall(false);
  }, [isGettingCall]);

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
      dispatch(callVideoActions.setLocalStream(stream));
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
      }
    } catch (error) {
      console.log('error to join call', error);
    }
  };

  useEffect(() => {
    if (peerConnection) {
      peerConnection.onicecandidate = (event: EventOnCandidate) => {
        if (event.candidate) {
          onHandleEmitIceCandidate(event.candidate);
        }
      };
      peerConnection.onaddstream = (event: EventOnAddStream) => {
        dispatch(callVideoActions.setRemoteStream(event.stream));
      };
    }
  }, [dispatch, groupId, onHandleEmitIceCandidate, peerConnection]);

  return (
    <ModalVideoCall isVisible={isVisibleGettingCall}>
      <GettingCall hangUp={onHangUpCall} join={joinCall} />
    </ModalVideoCall>
  );
};
