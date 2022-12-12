import { useState, useRef, useEffect, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
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

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

const sessionConstraints = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
};

export const GettingCallScreen2 = () => {
  const socket = useContext(WebSocketContext);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [gettingCall, setGettingCall] = useState(false);
  const [newOffer, setNewOffer] = useState<any>();
  const currentGroup = useSelector(currentGroupSelector);

  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const getMediaStream = async () => {
    const stream: MediaStream | null = await GetStreams.getStream();

    if (stream) {
      setLocalStream(stream);
      return stream;
    }
    return null;
  };

  const createPeerConnection = async () => {
    peerConnection.current = new RTCPeerConnection(configuration);
  };

  const sendOfferToUser = async (offer: RTCSessionDescription) => {
    socket.emit(SOCKET_EVENTS.OFFER_FOR_CALL_EVENT, {
      groupId: currentGroup?._id,
      offer: offer,
    });
  };

  const createOfferForCalling = async () => {
    if (peerConnection.current) {
      const offerDescription = (await peerConnection.current.createOffer(
        sessionConstraints,
      )) as RTCSessionDescription;
      await peerConnection.current.setLocalDescription(offerDescription);

      sendOfferToUser(offerDescription);
    }
  };

  const createCall = async () => {
    await createPeerConnection();
    const stream = await getMediaStream();
    if (peerConnection.current && stream) {
      peerConnection.current.addStream(stream);
    }

    await createOfferForCalling();
  };

  const handleAddNewIceCandidate = (remoteIceCandidate: any) => {
    console.log({ remoteIceCandidate });
    if (remoteIceCandidate.candidate) {
      const candidate = new RTCIceCandidate(remoteIceCandidate);
      if (peerConnection.current) {
        peerConnection.current.addIceCandidate(candidate);
      }
    }
  };

  useEffect(() => {
    if (peerConnection.current) {
      peerConnection.current.onicecandidate = (event: any) => {
        if (event.candidate) {
          socket.emit(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, {
            groupId: currentGroup?._id,
            iceCandidate: event.candidate,
          });
        }
      };
      peerConnection.current.onaddstream = (event: any) => {
        console.log('event roemote', event.stream);
        setRemoteStream(event.stream);
      };
    }
  }, [currentGroup?._id, socket, gettingCall, localStream]);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.ICE_CANDIDATE_EVENT, (payload: any) => {
      console.log('asdasd', payload);
      console.log(!!payload.iceCandidate);
      if (payload.iceCandidate) {
        handleAddNewIceCandidate(payload.iceCandidate);
      }
    });

    socket.on(SOCKET_EVENTS.OFFER_FOR_CALL_EVENT, async (payload: any) => {
      if (payload.offer) {
        await createPeerConnection();
        setGettingCall(true);
        setNewOffer(payload);
      }
    });

    socket.on(SOCKET_EVENTS.ANSWER_FOR_CALL_EVENT, async (payload) => {
      try {
        if (peerConnection.current && payload.answer) {
          const answerDescription = new RTCSessionDescription(payload.answer);

          await peerConnection.current.setRemoteDescription(answerDescription);
        }
      } catch (error) {
        console.log('error answer event', error);
      }
    });

    return () => {
      socket.off(SOCKET_EVENTS.ICE_CANDIDATE_EVENT);
    };
  }, [currentGroup?._id, socket]);

  const joinCall = async () => {
    try {
      const stream = await getMediaStream();
      if (peerConnection.current && stream) {
        peerConnection.current.addStream(stream);
      }

      if (peerConnection.current) {
        const offerDescription = new RTCSessionDescription(newOffer.offer);
        await peerConnection.current.setRemoteDescription(offerDescription);

        const answerDescription = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answerDescription as any);

        socket.emit(SOCKET_EVENTS.ANSWER_FOR_CALL_EVENT, {
          groupId: currentGroup?._id,
          answer: answerDescription,
        });
      }

      setGettingCall(false);
    } catch (error) {
      console.log('error to join cala', error);
    }
  };

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
