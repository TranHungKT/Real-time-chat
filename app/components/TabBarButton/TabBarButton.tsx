import { ReactNode } from 'react';
import { Button, Text } from 'react-native-paper';

import { palette } from '@Themes/index';
import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { styles } from './TabBarButtonStyles';

interface TabBarButtonProps {
  route: BottomTabBarProps['state']['routes'][number];
  options: BottomTabNavigationOptions;
  navigation: BottomTabBarProps['navigation'];
  isFocused: boolean;
}

export const TabBarButton = (props: TabBarButtonProps) => {
  const { route, options, navigation, isFocused } = props;

  const getTabBarLabel = () => {
    if (options.tabBarLabel) {
      return options.tabBarLabel;
    }
    if (options.title) {
      return options.title;
    }

    return route.name;
  };

  const handlePressButton = () => {
    if (!isFocused) {
      navigation.navigate({ name: route.name, merge: true, params: undefined });
    }
  };

  return (
    <Button
      mode="text"
      onPress={handlePressButton}
      style={[styles.container, isFocused ? styles.buttonWhenFocused : styles.buttonWhenNotFocused]}
      color={isFocused ? palette.blue : palette.white}
    >
      <Text style={isFocused ? styles.textWhenFocused : styles.textWhenNotFocused}>
        {getTabBarLabel() as ReactNode}
      </Text>
    </Button>
  );
};
