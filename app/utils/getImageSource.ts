import { ImageSourcePropType } from 'react-native';

export const getImageSource = (
  groupAvatar: string | ImageSourcePropType,
  isMoreThan2Member: boolean,
) => {
  if (!isMoreThan2Member) {
    return { uri: groupAvatar as string };
  }

  return groupAvatar as ImageSourcePropType;
};
