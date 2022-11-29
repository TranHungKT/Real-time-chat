import { InviteFriendsSvg } from '@Constants/index';
import { DrawerItem } from '@react-navigation/drawer';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const InviteFriendsContainer = () => {
  return (
    <DrawerItem
      label={() => <DrawerText text="Invite Friends" />}
      onPress={() => {}}
      icon={() => <DrawerIcon icon={InviteFriendsSvg} />}
    />
  );
};
