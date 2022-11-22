import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingComponent } from '@Components/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { currentGroupSelector, groupsActions } from '@Stores/groups';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from './ChatScreenStyles';
import { Header } from './components/Header';
import { ListChatsContainer } from './containers/ListChatsContainer';

export const ChatScreen = () => {
  const currentGroup = useSelector(currentGroupSelector);

  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'ChatScreen'>>();

  const handleClickGoBack = () => {
    dispatch(groupsActions.setCurrentGroupId(''));
  };

  const handleClickName = () => {
    navigation.navigate('GroupChatInformationScreen');
  };

  if (!currentGroup) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header onClickGoBack={handleClickGoBack} onClickName={handleClickName} />
      <ListChatsContainer />
    </SafeAreaView>
  );
};
