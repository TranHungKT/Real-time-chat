import { Text, Image, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

import { UserStatus } from '@Models/index';
import { currentGroupSelector } from '@Stores/groups';
import { getUserStatusByIdSelector, userIdSelector } from '@Stores/user';
import { getImageSource } from '@Utils/index';

import { styles } from './HeaderGroupChatContainerStyles';

interface HeaderGroupChatContainerProps {
  onClickHeader?: () => void;
  styleContainer?: ViewStyle;
}

export const HeaderGroupChatContainer = (props: HeaderGroupChatContainerProps) => {
  const { onClickHeader, styleContainer } = props;

  const currentGroup = useSelector(currentGroupSelector);
  const userId = useSelector(userIdSelector);
  const isMoreThan2Member = !!currentGroup && currentGroup.members.length > 2;

  const otherMember = currentGroup?.members.filter((member) => member._id !== userId);

  const userStatusSelector = useSelector(getUserStatusByIdSelector);
  const userStatus = userStatusSelector({ userId: otherMember ? otherMember[0]._id : '' });

  if (!currentGroup) {
    return <></>;
  }

  return (
    <TouchableOpacity
      onPress={onClickHeader}
      style={[styles.container, styleContainer]}
      disabled={!onClickHeader}
    >
      <Image
        source={getImageSource(currentGroup.groupAvatar, isMoreThan2Member)}
        style={styles.avatar}
      />
      <View style={styles.groupNameView}>
        <Text style={styles.groupName}>{currentGroup.name}</Text>

        <Text style={styles.status}>{userStatus === UserStatus.ONLINE ? 'Online' : 'Offline'}</Text>
      </View>
    </TouchableOpacity>
  );
};
