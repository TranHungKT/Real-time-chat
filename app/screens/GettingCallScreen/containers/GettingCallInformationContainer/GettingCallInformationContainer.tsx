import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { palette } from 'themes';

import { fetchUserDataById } from '@Services/index';
import { getCallerIdSelector } from '@Stores/callVideo';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { styles } from './GettingCallInformationContainerStyles';

interface GettingCallInformationContainerProps {
  hangUp: () => void;
  joinCall: () => void;
  onPressModal: () => void;
  isExpandingModal: boolean;
}

export const GettingCallInformationContainer = (props: GettingCallInformationContainerProps) => {
  const { hangUp, joinCall, onPressModal, isExpandingModal } = props;
  const callerId = useSelector(getCallerIdSelector);
  const accessToken = useSelector(userTokenSelector);
  console.log(callerId);
  const { data: userData } = useQuery(
    ['getCurrentUserData', accessToken],
    () => fetchUserDataById({ token: accessToken, id: '6310204832704ab39df8b7ac' }),
    { enabled: accessToken ? true : false },
  );

  return (
    <View style={[styles.container, isExpandingModal && styles.containerWhenExpading]}>
      <TouchableOpacity onPress={onPressModal}>
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
      </TouchableOpacity>
    </View>
  );
};
