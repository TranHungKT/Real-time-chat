import { MainTabBar } from '@Components/MainTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DocumentContainer, LocationContainer, ImagesContainer } from '../containers';
import { styles } from './GroupChatNavigatorStyles';

export const GroupChatTabNavigator = createBottomTabNavigator();

export const GroupChatTab = () => {
  return (
    <GroupChatTabNavigator.Navigator
      screenOptions={{ headerShown: false, tabBarIcon: () => <></> }}
      tabBar={(props) => (
        <MainTabBar
          {...props}
          style={styles.style}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    >
      <GroupChatTabNavigator.Screen component={ImagesContainer} name="Image" />
      <GroupChatTabNavigator.Screen component={LocationContainer} name="Location" />
      <GroupChatTabNavigator.Screen component={DocumentContainer} name="Document" />
    </GroupChatTabNavigator.Navigator>
  );
};
