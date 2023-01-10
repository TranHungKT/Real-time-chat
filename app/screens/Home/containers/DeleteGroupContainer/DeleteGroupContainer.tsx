import { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from 'react-native-paper';
import { palette } from 'themes';

import { ButtonSvg } from '@Components/index';
import { DeleteSvg } from '@Constants/index';

import { styles } from './DeleteGroupContainerStyles';

export const DeleteGroupContainer = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleDeleteGroupChat = () => setIsShowModal(true);
  const handleCancel = () => setIsShowModal(false);

  return (
    <>
      <ButtonSvg iconSvg={DeleteSvg} onPress={handleDeleteGroupChat} />
      <Modal isVisible={isShowModal} backdropOpacity={0.3} style={styles.container}>
        <Text style={styles.content}>
          Are you sure you want to permanently delete this conversation?
        </Text>
        <View style={styles.buttonView}>
          <TouchableHighlight
            style={styles.cancelButton}
            activeOpacity={0.5}
            underlayColor={palette.mediumWhite}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonContent}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.deleteButton}
            activeOpacity={0.5}
            onPress={handleCancel}
            underlayColor={palette.mediumWhite}
          >
            <Text style={styles.deleteButtonContent}>Delete</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </>
  );
};
