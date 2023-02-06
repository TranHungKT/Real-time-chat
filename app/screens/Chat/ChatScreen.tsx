import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingComponent } from '@Components/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { ImageGalleryContext } from '@Providers/index';
import { currentGroupSelector, groupsActions } from '@Stores/groups';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from './ChatScreenStyles';
import { Header } from './components/Header';
import { ImageGalleryContainer } from './containers/ImageGalleryContainer';
import { ListChatsContainer } from './containers/ListChatsContainer';

export const ChatScreen = () => {
  const currentGroup = useSelector(currentGroupSelector);

  const dispatch = useDispatch();

  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState('');

  const handleOpenModalImage = () => setIsVisibleImage(true);
  const handleCloseModalImage = () => setIsVisibleImage(false);

  const handleClickImage = (uri: string) => {
    setCurrentImageUri(uri);
    handleOpenModalImage();
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'ChatScreen'>>();

  const handleClickGoBack = () => {
    dispatch(groupsActions.setCurrentGroupId(''));
  };

  const handleClickName = () => {
    navigation.navigate('GroupChatInformationScreen');
  };

  const handleClickRightIcon = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  if (!currentGroup) {
    return <LoadingComponent />;
  }

  return (
    <ImageGalleryContext.Provider
      value={{
        onClickImage: handleClickImage,
      }}
    >
      <SafeAreaView style={styles.safeArea}>
        <Header
          onClickGoBack={handleClickGoBack}
          onClickName={handleClickName}
          onClickRightIcon={handleClickRightIcon}
        />
        <ListChatsContainer />
        <ImageGalleryContainer
          currentImage={currentImageUri}
          onCloseImage={handleCloseModalImage}
          isVisible={isVisibleImage}
        />
      </SafeAreaView>
    </ImageGalleryContext.Provider>
  );
};
