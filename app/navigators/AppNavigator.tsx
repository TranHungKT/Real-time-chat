import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import { MainTabBar, LoadingComponent } from '@Components/index';
import { linking } from '@Configs/index';
import { SOCKET_EVENTS } from '@Constants/index';
import { useSocket } from '@Hooks/useSocket';
import {
  LoginScreen,
  HomeScreen,
  ChatScreen,
  SplashScreen,
  GroupChatInformationScreen,
} from '@Screens/index';
import { userTokenSelector } from '@Stores/user';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WebSocketContext, initSocket } from '../providers/WebSocketProvider';
import { navigationRef, useBackButtonHandler } from './NavigationUtilities';

export type AllGroupChatNavigationParamList = {
  AllMessageScreen: undefined;
  ChatScreen: undefined;
  GroupChatInformationScreen: undefined;
};

const AllGroupChatStack = createNativeStackNavigator<AllGroupChatNavigationParamList>();

const AllGroupChat = () => {
  const token = useSelector(userTokenSelector);

  const [currentSocket, setCurrentSocket] = useState<Socket | undefined>(undefined);

  const socket = useMemo(() => currentSocket ?? initSocket(token), [currentSocket, token]);

  useEffect(() => {
    if (socket) {
      socket.on(SOCKET_EVENTS.CONNECT, () => {
        setCurrentSocket(socket);
      });

      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        setCurrentSocket(undefined);
      });
    }
  });

  if (isEmpty(socket)) {
    return <LoadingComponent />;
  }

  return (
    <WebSocketContext.Provider value={socket}>
      <AllGroupChatContainer />
    </WebSocketContext.Provider>
  );
};

const AllGroupChatContainer = () => {
  useSocket();
  return (
    <AllGroupChatStack.Navigator screenOptions={{ headerShown: false }}>
      <AllGroupChatStack.Screen name="AllMessageScreen" component={MainTobTab} />
      <AllGroupChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <AllGroupChatStack.Screen
        name="GroupChatInformationScreen"
        component={GroupChatInformationScreen}
      />
    </AllGroupChatStack.Navigator>
  );
};

export type MainNavigatorParamList = {
  HomeScreen: undefined;
  ImportantMessageScreen: undefined;
  UnreadMessageScreen: undefined;
  ReadMessageScreen: undefined;
};

const MainTobTabStack = createBottomTabNavigator<MainNavigatorParamList>();

const MainTobTab = () => {
  return (
    <MainTobTabStack.Navigator
      screenOptions={{ headerShown: false, tabBarIcon: () => <></> }}
      tabBar={(props) => <MainTabBar {...props} />}
    >
      <MainTobTabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'All',
        }}
      />
      <MainTobTabStack.Screen
        name="ImportantMessageScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Important',
        }}
      />
      <MainTobTabStack.Screen
        name="UnreadMessageScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Unread',
        }}
      />
      <MainTobTabStack.Screen
        name="ReadMessageScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Read',
        }}
      />
    </MainTobTabStack.Navigator>
  );
};

export type NavigatorParamList = {
  LoginScreen: undefined;
  MainTobTab: undefined;
  SplashSreen: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SplashSreen"
    >
      <Stack.Screen name="SplashSreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainTobTab" component={AllGroupChat} />
    </Stack.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();
  useBackButtonHandler(canExit);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      linking={linking}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['welcome'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
