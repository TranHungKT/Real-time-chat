import { ScrollView, ViewStyle } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { TabBarButton } from '../TabBarButton';
import { styles } from './MainTabBarStyles';

interface MainTabBarProps extends BottomTabBarProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const MainTabBar = ({
  state,
  descriptors,
  navigation,
  style,
  contentContainerStyle,
}: MainTabBarProps) => {
  return (
    <ScrollView
      style={[styles.container, { ...style }]}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    >
      {state.routes.map((route, index) => (
        <TabBarButton
          key={route.key}
          route={route}
          options={descriptors[route.key].options}
          navigation={navigation}
          isFocused={state.index === index}
        />
      ))}
    </ScrollView>
  );
};
