import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { HeaderGroupChatContainer } from '@Containers/index';
import { palette } from '@Themes/index';
import { useNavigation } from '@react-navigation/native';

import { styles } from './HeaderStyles';

interface HeaderProps {
  onClickGoBack?: () => void;
  onClickName: () => void;
}

export const Header = (props: HeaderProps) => {
  const { onClickGoBack, onClickName } = props;

  const navigation = useNavigation();

  const handleClickGoBack = () => {
    onClickGoBack && onClickGoBack();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstColumn}>
        <TouchableOpacity onPress={handleClickGoBack}>
          <Icon name="chevron-left" size={40} color={palette.blue} />
        </TouchableOpacity>

        <HeaderGroupChatContainer onClickHeader={onClickName} />
      </View>
      <TouchableOpacity style={styles.profileIconView}>
        <View style={styles.profileIconRow}>
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
        </View>
        <View style={styles.profileIconRow}>
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
          <Icon name="circle-small" size={35} style={styles.profileIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
