import moment from 'moment';
import { View, TouchableHighlight, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { getImageSource } from 'utils';

import { Group as IGroup, UserStatus } from '@Models/index';
import { palette } from '@Themes/index';

import { LastMessageContainer } from '../../containers/LastMessageContainer';
import { UnReadMessageContainer } from '../../containers/UnReadMessageContainer';
import { styles } from './GroupStyles';

interface GroupProps {
  group: IGroup;
  onClickGroup: () => void;
  numberOfUnReadMessage?: number;
  userStatus: UserStatus;
  isDeleting?: boolean;
  errorDeleting?: string;
}

export const Group = (props: GroupProps) => {
  const { group, onClickGroup, numberOfUnReadMessage, userStatus } = props;
  const { _id, name, lastUpdatedAt, groupAvatar } = group;

  const isMoreThan2Member = () => group.members.length > 2;

  return (
    <TouchableHighlight
      key={_id}
      style={styles.container}
      onPress={onClickGroup}
      activeOpacity={0.9}
      underlayColor={palette.mediumWhite}
    >
      <>
        <ImageBackground
          source={getImageSource(groupAvatar, isMoreThan2Member())}
          imageStyle={styles.avatarImage}
          resizeMode="cover"
          style={styles.avatarView}
        >
          {<Text style={styles.status}>{userStatus === UserStatus.ONLINE ? '\u2B24' : ''}</Text>}
        </ImageBackground>
        <View style={styles.groupView}>
          <Text numberOfLines={1} style={styles.groupName}>
            {name}
          </Text>

          <LastMessageContainer
            members={group.members}
            message={group.lastMessage}
            hasUnReadMessage={!!numberOfUnReadMessage}
          />
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.lastUpdatedTime}>{moment(lastUpdatedAt).format('HH:MM')}</Text>
          {numberOfUnReadMessage !== undefined && (
            <UnReadMessageContainer
              numberOfUnReadMessage={numberOfUnReadMessage}
              senderOfLastMessage={group.lastMessage?.user}
              lastMessage={group.lastMessage}
              groupId={group._id}
            />
          )}
        </View>
      </>
    </TouchableHighlight>
  );
};
