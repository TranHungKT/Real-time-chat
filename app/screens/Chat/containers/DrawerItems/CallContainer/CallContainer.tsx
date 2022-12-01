import { PhoneSvg } from '@Constants/index';
import { NavigatorParamList } from '@Navigators/index';
import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const CallContainer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorParamList, 'MainTobTab'>>();

  const handleCall = () => navigation.navigate('GettingCallScreen');

  return (
    <DrawerItem
      label={() => <DrawerText text="Call" />}
      onPress={handleCall}
      icon={() => <DrawerIcon icon={PhoneSvg} />}
    />
  );
};
