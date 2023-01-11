import { View } from 'react-native';

import { ButtonSvg } from '@Components/index';
import { AchiveChatSvg, SeenMessageSvg } from '@Constants/index';

import { DeleteGroupContainer } from '../../containers/DeleteGroupContainer';
import { styles } from './HiddenItemGroupStyle';

interface HiddenItemGroupProps {
  groupId: string;
  onCloseRow: () => void;
}

export const HiddenItemGroup = (props: HiddenItemGroupProps) => {
  const { groupId, onCloseRow } = props;
  return (
    <View style={styles.container}>
      <ButtonSvg onPress={onCloseRow} iconSvg={AchiveChatSvg} />
      <ButtonSvg onPress={onCloseRow} iconSvg={SeenMessageSvg} />
      <DeleteGroupContainer groupId={groupId} onCloseRow={onCloseRow} />
    </View>
  );
};
