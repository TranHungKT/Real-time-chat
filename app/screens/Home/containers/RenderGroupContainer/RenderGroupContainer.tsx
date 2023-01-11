import { useSelector } from 'react-redux';

import { Group as IGroup, MessageStatus } from '@Models/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { getMessagesUnSeenOrReceivedByGroupIdSelector } from '@Stores/messages';
import { getUserStatusByIdSelector, userIdSelector } from '@Stores/user';
import { IMAGES } from '@Themes/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Group } from '../../components/Group';

interface RenderGroupContainerProps {
  group: IGroup;
}
export const RenderGroupContainer = (props: RenderGroupContainerProps) => {
  const { group } = props;
  const { members } = group;

  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'AllMessageScreen'>>();

  const userId = useSelector(userIdSelector);
  const groupMessagesUnSeenSelector = useSelector(getMessagesUnSeenOrReceivedByGroupIdSelector);
  const groupMessagesUnSeen = groupMessagesUnSeenSelector({
    groupId: group._id,
    status: MessageStatus.SEEN,
  });
  const otherMember = members.filter((member) => member._id !== userId);

  const userStatusSelector = useSelector(getUserStatusByIdSelector);
  const userStatus = userStatusSelector({ userId: otherMember[0]._id });

  const generateGroupName = () => {
    let name = '';
    members.forEach((member) => {
      if (member._id !== userId) {
        name = name + `,${member.firstName} ${member.lastName}`;
      }
    });

    return name.substring(1);
  };

  const getAvatarUrl = () => {
    if (members.length === 2) {
      return members.filter((member) => member._id !== userId)[0].avatarUrl;
    }
    return IMAGES.Group;
  };

  const handleClickGroup = () => {
    dispatch(groupsActions.setCurrentGroupId(group._id));
    navigation.navigate('ChatScreen');
  };

  return (
    <Group
      group={{ ...group, name: generateGroupName(), groupAvatar: getAvatarUrl() }}
      onClickGroup={handleClickGroup}
      numberOfUnReadMessage={groupMessagesUnSeen?.length}
      userStatus={userStatus}
    />
  );
};
