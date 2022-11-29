import { ContactsSvg } from '@Constants/index';
import { DrawerItem } from '@react-navigation/drawer';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const ContactContainer = () => {
  return (
    <DrawerItem
      label={() => <DrawerText text="Contacts" />}
      onPress={() => {}}
      icon={() => <DrawerIcon icon={ContactsSvg} />}
    />
  );
};
