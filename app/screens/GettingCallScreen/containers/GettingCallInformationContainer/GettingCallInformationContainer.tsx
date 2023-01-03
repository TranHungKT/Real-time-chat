import { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { palette } from 'themes';

import { fetchUserDataById } from '@Services/index';
import { callVideoActions, getCallerIdSelector } from '@Stores/callVideo';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { styles } from './GettingCallInformationContainerStyles';

interface GettingCallInformationContainerProps {
  hangUp: () => void;
  joinCall: () => void;
}

export const GettingCallInformationContainer = (props: GettingCallInformationContainerProps) => {
  const { hangUp, joinCall } = props;
  const callerId = useSelector(getCallerIdSelector);
  const accessToken = useSelector(userTokenSelector);
  const dispatch = useDispatch();
  const { data: userData } = useQuery(
    ['getCurrentUserData', accessToken],
    () => fetchUserDataById({ token: accessToken, id: callerId }),
    { enabled: accessToken ? true : false },
  );

  useEffect(() => {
    if (userData) {
      dispatch(callVideoActions.setCallee(userData));
    }
  }, [dispatch, userData]);

  return (
    <View style={styles.container}>
      <View style={styles.information}>
        <Image source={{ uri: userData?.avatarUrl }} style={styles.avatar} />
        <Text style={styles.userName}>
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text style={styles.text}> call you</Text>
      </View>
      <View style={styles.actionButtons}>
        <Button onPress={joinCall} icon="phone" color={palette.green}>
          <Text>Reply</Text>
        </Button>
        <Text>|</Text>
        <Button onPress={hangUp} icon="phone-hangup" color={palette.red}>
          <Text>Cancel</Text>
        </Button>
      </View>
    </View>
  );
};
