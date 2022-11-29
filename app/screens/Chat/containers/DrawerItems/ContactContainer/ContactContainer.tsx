import { ContactsSvg } from '@Constants/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { DrawerText, DrawerIcon } from '../../../components/DrawerComponents';

export const ContactContainer = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'ChatScreen'>>();

  const handleMoveToContactScreen = () => {
    navigation.navigate('GroupChatInformationScreen');
  };

  return (
    <DrawerItem
      label={() => <DrawerText text="Contacts" />}
      onPress={handleMoveToContactScreen}
      icon={() => <DrawerIcon icon={ContactsSvg} />}
    />
  );
};
