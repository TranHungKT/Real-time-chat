import { PropsWithChildren } from 'react';
import Modal, { ModalProps } from 'react-native-modal';

import { styles } from './ModalVideoCallStyles';

interface ModalVideoCallProps extends Partial<ModalProps> {}

export const ModalVideoCall = (props: PropsWithChildren<ModalVideoCallProps>) => {
  const { children, isVisible, style, ...rest } = props;
  return (
    <Modal isVisible={isVisible} style={[styles.container, style]} {...rest}>
      {children}
    </Modal>
  );
};
