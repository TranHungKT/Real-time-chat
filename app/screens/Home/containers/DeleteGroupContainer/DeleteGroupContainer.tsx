import { useState } from 'react';

import { ButtonWithSvg } from '@Components/index';
import { DeleteSvg } from '@Constants/index';
import { deleteGroupAction } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';

import { DeleteGroupModal } from '../../components';

interface DeleteGroupContainerProps {
  groupId: string;
  onCloseRow: () => void;
}

export const DeleteGroupContainer = (props: DeleteGroupContainerProps) => {
  const { groupId, onCloseRow } = props;

  const dispatch = useAppDispatch();

  const [isShowModal, setIsShowModal] = useState(false);

  const handleDeleteGroupChat = () => {
    setIsShowModal(true);
    onCloseRow();
  };
  const handleCancel = () => setIsShowModal(false);

  const handleDelete = async () => {
    setIsShowModal(false);
    await dispatch(deleteGroupAction(groupId)).unwrap();
  };

  return (
    <>
      <ButtonWithSvg iconSvg={DeleteSvg} onPress={handleDeleteGroupChat} />
      <DeleteGroupModal isShowModal={isShowModal} onCancel={handleCancel} onDelete={handleDelete} />
    </>
  );
};
