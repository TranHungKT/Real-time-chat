import { PhoneSvg } from '@Constants/index';
import { DrawerItem } from '@react-navigation/drawer';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const CallContainer = () => {
  return (
    <DrawerItem
      label={() => <DrawerText text="Call" />}
      onPress={() => {}}
      icon={() => <DrawerIcon icon={PhoneSvg} />}
    />
  );
};
