import { TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from 'react-native-paper';
import { palette } from 'themes';

import { styles } from './DeleteGroupModalStyles';

interface DeleteGroupModalProps {
  isShowModal: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export const DeleteGroupModal = (props: DeleteGroupModalProps) => {
  const { isShowModal, onCancel, onDelete } = props;

  return (
    <Modal isVisible={isShowModal} backdropOpacity={0.3} style={styles.container}>
      <Text style={styles.content}>
        Are you sure you want to permanently delete this conversation?
      </Text>
      <View style={styles.buttonView}>
        <TouchableHighlight
          style={styles.cancelButton}
          activeOpacity={0.5}
          underlayColor={palette.mediumWhite}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonContent}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.deleteButton}
          activeOpacity={0.5}
          onPress={onDelete}
          underlayColor={palette.mediumWhite}
        >
          <Text style={styles.deleteButtonContent}>Delete</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};
