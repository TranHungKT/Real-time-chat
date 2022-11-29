import { ChatFAQSvg } from '@Constants/index';
import { DrawerItem } from '@react-navigation/drawer';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const ChatFAQContainer = () => {
  return (
    <DrawerItem
      label={() => <DrawerText text="Contacts" />}
      onPress={() => {}}
      icon={() => <DrawerIcon icon={ChatFAQSvg} />}
    />
  );
};
