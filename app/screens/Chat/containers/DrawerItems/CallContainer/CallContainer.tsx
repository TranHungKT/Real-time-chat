import { callVideoActions } from 'stores/callVideo';

import { PhoneSvg } from '@Constants/index';
import { useAppDispatch } from '@Stores/index';
import { DrawerItem } from '@react-navigation/drawer';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const CallContainer = () => {
  const dispatch = useAppDispatch();

  const handleCall = () => {
    dispatch(callVideoActions.setCreateNewCall());
  };
  return (
    <>
      <DrawerItem
        label={() => <DrawerText text="Call" />}
        onPress={handleCall}
        icon={() => <DrawerIcon icon={PhoneSvg} />}
      />
    </>
  );
};
