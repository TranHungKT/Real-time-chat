import { PhoneSvg } from '@Constants/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const CallContainer = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'ChatScreen'>>();

  const handleCall = () => navigation.navigate('CallingScreen');

  return (
    <DrawerItem
      label={() => <DrawerText text="Call" />}
      onPress={handleCall}
      icon={() => <DrawerIcon icon={PhoneSvg} />}
    />
  );
};
