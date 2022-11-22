import { useState } from 'react';
import { FlatList, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useSelector } from 'react-redux';

import { fetchImagesOfGroups } from '@Services/index';
import { currentGroupSelector } from '@Stores/groups';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { RenderListImage } from '../../components';
import { styles } from './ImagesContainerStyles';

export const ImagesContainer = () => {
  const currentGroup = useSelector(currentGroupSelector);
  const token = useSelector(userTokenSelector);

  const [currentImage, setCurrentImage] = useState(0);
  const [visible, setIsVisible] = useState(false);

  const { data, isFetching } = useQuery(['getImages', token], () =>
    fetchImagesOfGroups({ token, groupId: currentGroup?._id || '' }),
  );

  const handlePressImage = (index: number) => () => {
    setCurrentImage(index);
    setIsVisible(true);
  };

  const renderItem = ({ item, index }: { item: { id: string; image: string }; index: number }) => {
    return <RenderListImage item={item} onPressImage={handlePressImage(index)} />;
  };

  const handleCloseImage = () => setIsVisible(false);

  if (isFetching || !data) {
    return <></>;
  }

  const imagesData = data.map((messsage) => ({ uri: messsage.image }));

  return (
    <>
      <View style={styles.blankView} />
      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.container}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <ImageView
        images={imagesData}
        imageIndex={currentImage}
        visible={visible}
        onRequestClose={handleCloseImage}
      />
    </>
  );
};
