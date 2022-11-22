import { GroupResponse, Member } from '@Models/index';
import { IMAGES } from '@Themes/index';

const generateGroupName = ({ members, userId }: { members: Member[]; userId: string }) => {
  let name = '';
  members.forEach((member) => {
    if (member._id !== userId) {
      name = name + `,${member.firstName} ${member.lastName}`;
    }
  });

  return name.substring(1);
};

const getAvatarUrl = ({ members, userId }: { members: Member[]; userId: string }) => {
  if (members.length === 2) {
    return members.filter((member) => member._id !== userId)[0].avatarUrl;
  }
  return IMAGES.Group;
};

export const normalizeGroup = (group: GroupResponse, userId: string) => ({
  ...group,
  name: generateGroupName({ members: group.members, userId }),
  groupAvatar: getAvatarUrl({ members: group.members, userId }),
  usersTyping: [],
});
