import { useEffect, useCallback, useState } from 'react';
import { View, Linking, Alert, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { URLSearchParams, URL } from 'react-native-url-polyfill';
import { useSelector } from 'react-redux';

import { BASE_URL } from '@Configs/index';
import { ACCESS_TOKEN_KEY } from '@Constants/index';
import { User } from '@Models/index';
import { NavigatorParamList } from '@Navigators/index';
import { fetchCurrentUserData } from '@Services/index';
import { useAppDispatch } from '@Stores/index';
import { userActions, userIdSelector } from '@Stores/user';
import { IMAGES } from '@Themes/images';
import { setAsyncStorageData } from '@Utils/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { styles } from './LoginStyles';

// TODO: MOVE TO ENV
const AUTH_URL = `${BASE_URL}auth/facebook`;
const URL_TYPE = 'url';

const ALERT_OPEN_URL = 'Can not open this url';

export const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector(userIdSelector);
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList, 'LoginScreen'>>();
  const [accessToken, setAccessToken] = useState('');

  const handleSaveUserDataToRedux = useCallback(
    (data: User) => {
      dispatch(userActions.setUserData(data));
    },
    [dispatch],
  );

  const { data } = useQuery(
    ['getCurrentUserData', accessToken],
    () => fetchCurrentUserData(accessToken as string),
    { enabled: accessToken ? true : false },
  );

  const decodeCallbackUrl = useCallback((url: string) => {
    const callbackURL = new URL(url);
    const userParams = new URLSearchParams(callbackURL.search);

    for (const userInfo of userParams) {
      setAccessToken(userInfo[1]);
      setAsyncStorageData({ key: ACCESS_TOKEN_KEY, data: userInfo[1] });
    }
  }, []);

  const openUrl = async () => {
    const isSupportedURL = await Linking.canOpenURL(AUTH_URL);
    if (isSupportedURL) {
      return Linking.openURL(AUTH_URL);
    }
    Alert.alert(ALERT_OPEN_URL);
  };

  useEffect(() => {
    Linking.addEventListener(URL_TYPE, (payload: { url: string }) =>
      decodeCallbackUrl(payload.url),
    );

    return () => {
      Linking.removeAllListeners(URL_TYPE);
    };
  }, [decodeCallbackUrl]);

  useEffect(() => {
    data && handleSaveUserDataToRedux({ ...data, accessToken });
  }, [accessToken, data, handleSaveUserDataToRedux]);

  useEffect(() => {
    if (userId) {
      return navigation.reset({
        index: 1,
        routes: [{ name: 'MainTobTab' }],
      });
    }
  }, [navigation, userId]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={IMAGES.LoginLogo} style={styles.logo} />
      <View style={styles.button}>
        <Button mode="contained" onPress={openUrl}>
          Login With Facebook
        </Button>
      </View>
    </SafeAreaView>
  );
};
