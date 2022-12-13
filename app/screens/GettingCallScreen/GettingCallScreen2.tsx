/* eslint-disable react-hooks/exhaustive-deps */
import { PeerConnectionContext } from 'providers/CallVideoProvider';
import { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  EventOnAddStream,
  EventOnCandidate,
  MediaStream,
  RTCSessionDescription,
  RTCSessionDescriptionType,
} from 'react-native-webrtc';
import { useSelector } from 'react-redux';
import { palette } from 'themes';
import GetStreams from 'utils/getStreams';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { currentGroupSelector } from '@Stores/groups';

import { styles } from './GettingCallScreenStyles';
import { GettingCall } from './components/GettingCall/GettingCall';
import { Video } from './components/Video/Video';

export const GettingCallScreen2 = () => {
  const socket = useContext(WebSocketContext);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [gettingCall, setGettingCall] = useState(false);
  const [newOffer, setNewOffer] = useState<RTCSessionDescriptionType>();
  const currentGroup = useSelector(currentGroupSelector);

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

  const sendOfferToUser = async (offer: RTCSessionDescription) => {
    socket.emit(SOCKET_EVENTS.OFFER_FOR_CALL_EVENT, {
      groupId: currentGroup?._id,
      offer: offer,
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
    await getMediaStream();

    await createOfferForCalling();
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
      groupId: currentGroup?._id,
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
  }, [currentGroup?._id, socket, gettingCall, localStream, peerConnection]);

  useEffect(() => {
    socket.on(
      SOCKET_EVENTS.OFFER_FOR_CALL_EVENT,
      async (payload: { offer: RTCSessionDescription }) => {
        if (payload.offer) {
          setGettingCall(true);
          setNewOffer(payload.offer);
        }
      },
    );

    socket.on(SOCKET_EVENTS.ANSWER_FOR_CALL_EVENT, async (payload) => {
      try {
        if (payload.answer) {
          await handleRemoteDescription(payload.answer);
        }
      } catch (error) {
        console.log('error answer event', error);
      }
    });
  }, [currentGroup?._id, handleRemoteDescription, socket]);

  if (gettingCall) {
    return <GettingCall hangUp={() => {}} join={joinCall} />;
  }
  if (localStream) {
    return <Video hangUp={() => {}} localStream={localStream} remoteStream={remoteStream} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={createCall}>
        <Icon name="video" style={styles.joinPhone} size={32} color={palette.white} />
      </TouchableOpacity>
    </View>
  );
};
