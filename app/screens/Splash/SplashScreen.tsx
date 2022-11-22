import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { EmptyOrErrorContent } from '@Components/index';
import { ACCESS_TOKEN_KEY } from '@Constants/index';
import { NavigatorParamList } from '@Navigators/index';
import { fetchUserData } from '@Services/index';
import { useAppDispatch } from '@Stores/index';
import { userActions, userIdSelector } from '@Stores/user';
import { IMAGES } from '@Themes/index';
import { getAsyncStorageData } from '@Utils/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { styles } from './SplashScreenStyles';

export const SplashScreen = () => {
  const [accessToken, setAccessToken] = useState<string | null | undefined>(null);

  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList, 'SplashSreen'>>();
  const dispatch = useAppDispatch();

  const userId = useSelector(userIdSelector);

  const { data, error } = useQuery(
    ['getUserData', accessToken],
    () => fetchUserData(accessToken as string),
    { enabled: accessToken ? true : false },
  );

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await getAsyncStorageData(ACCESS_TOKEN_KEY);
      if (token) {
        setAccessToken(JSON.parse(token));
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken && data) {
      dispatch(userActions.setUserData({ ...data, accessToken }));
    }
    if (!accessToken) {
      return navigation.navigate('LoginScreen');
    }
  }, [accessToken, navigation, data, dispatch]);

  useEffect(() => {
    if (userId) {
      return navigation.navigate('MainTobTab');
    }
  }, [navigation, userId]);

  if (error) {
    return (
      <EmptyOrErrorContent
        source={IMAGES.Error}
        title="Something went wrong"
        subTitle="Please try again later"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Image source={IMAGES.LoginLogo} style={styles.image} />
      <ActivityIndicator />
    </View>
  );
};
