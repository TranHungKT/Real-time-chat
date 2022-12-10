import { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MediaStream,
  RTCPeerConnection,
  EventOnAddStream,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import GetStreams from 'utils/getStreams';

import { palette } from '@Themes/index';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { styles } from './GettingCallScreenStyles';
import { GettingCall } from './components/GettingCall/GettingCall';
import { Video } from './components/Video/Video';

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

export const GettingCallScreen = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();

  const connecting = useRef(false);

  const setupWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);

    const stream = await GetStreams.getStream();

    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
    }

    pc.current.onaddstream = (event: EventOnAddStream) => {
      setRemoteStream(event.stream);
    };
  };

  const create = async () => {
    console.log('Calling');
    connecting.current = true;
    await setupWebrtc();

    const cRef = firestore().collection('meet').doc('chatId');

    collectIceCandidates(cRef, 'caller', 'callee');

    if (pc.current) {
      const offer = await pc.current.createOffer();

      pc.current.setLocalDescription(offer);

      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      cRef.set(cWithOffer);
    }
  };
  const join = async () => {
    console.log('Joining the call');
    connecting.current = true;

    setGettingCall(false);
    const cRef = firestore().collection('meet').doc('chatId');
    const offer = (await cRef.get()).data()?.offer;

    if (offer) {
      await setupWebrtc();

      collectIceCandidates(cRef, 'callee', 'caller');

      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.current.createAnswer();

        pc.current.setLocalDescription(answer);

        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };

        cRef.update(cWithAnswer);
      }
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hangUp = async () => {
    setGettingCall(false);
    connecting.current = false;
    streamCleanUp();
    firestoreCleanUp();

    if (pc.current) {
      pc.current.close();
    }
  };

  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };
  const firestoreCleanUp = async () => {
    const cRef = firestore().collection('meet').doc('chatId');
    if (cRef) {
      const calleeCandidate = await cRef.collection('callee').get();
      calleeCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });

      const callerCandidate = await cRef.collection('caller').get();
      callerCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });

      cRef.delete();
    }
  };

  const collectIceCandidates = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string,
  ) => {
    const candiateCollection = cRef.collection(localName);

    if (pc.current) {
      pc.current.onicecandidate = (event) => {
        if (event.candidate) {
          candiateCollection.add(event.candidate);
        }
      };
    }

    cRef.collection(remoteName).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === 'added') {
          const candiate = new RTCIceCandidate(change.doc.data());
          pc.current?.addIceCandidate(candiate);
        }
      });
    });
  };

  useEffect(() => {
    const cRef = firestore().collection('meet').doc('chatId');

    const subcribe = cRef.onSnapshot((snapshot) => {
      const data = snapshot.data();

      if (pc.current && !pc.current.remoteDescription && data && data.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }

      if (data && data.offer && !connecting.current) {
        console.log('lol');
        setGettingCall(true);
      }
    });

    const subcribeDelete = cRef.collection('callee').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          hangUp();
        }
      });
    });

    return () => {
      subcribe();
      subcribeDelete();
    };
  }, [hangUp]);

  if (gettingCall) {
    return <GettingCall hangUp={hangUp} join={join} />;
  }
  if (localStream) {
    return <Video hangUp={hangUp} localStream={localStream} remoteStream={remoteStream} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={create}>
        <Icon name="video" style={styles.joinPhone} size={32} color={palette.white} />
      </TouchableOpacity>
    </View>
  );
};
