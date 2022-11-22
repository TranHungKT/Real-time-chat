import { useRef, useEffect } from 'react';
import { BackHandler } from 'react-native';

import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const getActiveRouteName = (state: NavigationState | PartialState<NavigationState>): any => {
  const route = state.routes[state.index || 0];

  if (!route.state) {
    return route.name;
  }

  return getActiveRouteName(route.state);
};

export const useBackButtonHandler = (canExit: (routeName: string) => boolean) => {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      const routeName = getActiveRouteName(navigationRef.getRootState());

      if (canExitRef.current(routeName)) {
        // exit and let the system know we've handled the event
        BackHandler.exitApp();
        return true;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
};
