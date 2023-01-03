import { useContext, useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { getCalleeInformationSelector } from '@Stores/callVideo';

import { styles } from './CalleeVideoContainerStyles';

interface CalleeVideoContainerProps {
  remoteStream: MediaStream;
}

export const CalleeVideoContainer = (props: CalleeVideoContainerProps) => {
  const { remoteStream } = props;
  const socket = useContext(WebSocketContext);

  const [isCalleeTurnOnVideo, setIsCalleeTurnOnVideo] = useState(true);
  const [isCalleeTurnOnAudio, setIsCalleeTurnOnAudio] = useState(true);

  const callee = useSelector(getCalleeInformationSelector);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.TOOGLE_AUDIO_EVENT, () => {
      setIsCalleeTurnOnAudio(!isCalleeTurnOnAudio);
    });

    socket.on(SOCKET_EVENTS.TOOGLE_VIDEO_EVENT, (payload) => {
      console.log('payload vidoe', payload);
      setIsCalleeTurnOnVideo(payload.isEnable);
    });
  }, [isCalleeTurnOnAudio, isCalleeTurnOnVideo, socket]);

  return (
    <>
      {isCalleeTurnOnVideo ? (
        <RTCView streamURL={remoteStream.toURL()} objectFit={'cover'} style={styles.video} />
      ) : (
        <View style={styles.calleeTurnOffVideo}>
          <Image source={{ uri: callee?.avatarUrl }} style={styles.avatar} />
          <Text style={styles.calleName}>
            {callee?.firstName} {callee?.lastName}
          </Text>
        </View>
      )}
    </>
  );
};
