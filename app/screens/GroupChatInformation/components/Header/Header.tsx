import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { HeaderGroupChatContainer } from '@Containers/index';
import { palette } from '@Themes/index';
import { useNavigation } from '@react-navigation/native';

import { styles } from './HeaderStyles';

export const Header = () => {
  const navigation = useNavigation();

  const handleClickGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <TouchableOpacity onPress={handleClickGoBack}>
        <Icon name="chevron-left" size={40} color={palette.blue} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.container}>
        <HeaderGroupChatContainer />
        <Icon name="clipboard-text-outline" size={40} color={palette.blue} />
      </View>
    </>
  );
};
