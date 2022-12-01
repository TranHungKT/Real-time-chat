import { View } from 'react-native';

import { HeaderGroupChatContainer } from '@Containers/index';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import {
  CallContainer,
  ContactContainer,
  ChatFAQContainer,
  SaveMessageContainer,
  InviteFriendsContainer,
} from '../DrawerItems';
import { styles } from './DrawerContentContainerStyles';

export const DrawerContentContainer = (props: any) => {
  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.container}>
          <HeaderGroupChatContainer styleContainer={styles.groupAvatar} />
        </View>
        <ContactContainer />
        <CallContainer />
        <SaveMessageContainer />
        <InviteFriendsContainer />
        <ChatFAQContainer />
      </DrawerContentScrollView>
    </>
  );
};
