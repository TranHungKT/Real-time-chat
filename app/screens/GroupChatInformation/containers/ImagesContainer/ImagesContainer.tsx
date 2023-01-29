import { useState } from 'react';
import { FlatList, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { useSelector } from 'react-redux';

import { fetchImagesOfGroups } from '@Services/index';
import { currentGroupSelector } from '@Stores/groups';
import { userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { RenderListImage } from '../../components';
import { styles } from './ImagesContainerStyles';

const KEY_FLAT_LIST = 'KEY_FLAT_LIST';
const KEY_IMAGE_VIEW = 'KEY_IMAGE_VIEW';

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

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <RenderListImage
        item={item}
        onPressImage={handlePressImage(index)}
        key={index + item + KEY_FLAT_LIST}
      />
    );
  };

  const handleCloseImage = () => setIsVisible(false);

  if (isFetching || !data) {
    return <></>;
  }

  const imagesData = data.map((image) => ({ uri: image }));

  const getKeyExtractorForImagesView = (item: ImageSource, index: number) =>
    item.uri + index + KEY_IMAGE_VIEW;

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
        keyExtractor={getKeyExtractorForImagesView}
      />
    </>
  );
};
