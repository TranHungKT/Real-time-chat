import { useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from 'react-native-paper';
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
          <View style={styles.cancelButton}>
            <Button
              onPress={handleCancel}
              color={palette.blue}
              uppercase={false}
              labelStyle={styles.buttonText}
            >
              Cancel
            </Button>
          </View>
          <View style={styles.deleteButton}>
            <Button
              textColor={palette.red}
              uppercase={false}
              labelStyle={styles.buttonText}
              onPress={handleCancel}
              mode="text"
            >
              Delete
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};
