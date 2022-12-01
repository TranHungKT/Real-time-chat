import { SaveMessagesSvg } from '@Constants/index';
import { DrawerItem } from '@react-navigation/drawer';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const SaveMessageContainer = () => {
  return (
    <DrawerItem
      label={() => <DrawerText text="Save Messages" />}
      onPress={() => {}}
      icon={() => <DrawerIcon icon={SaveMessagesSvg} />}
    />
  );
};
