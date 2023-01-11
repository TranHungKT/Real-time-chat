import { View } from 'react-native';

import { ButtonWithSvg } from '@Components/index';
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
      <ButtonWithSvg onPress={onCloseRow} iconSvg={AchiveChatSvg} />
      <ButtonWithSvg onPress={onCloseRow} iconSvg={SeenMessageSvg} />
      <DeleteGroupContainer groupId={groupId} onCloseRow={onCloseRow} />
    </View>
  );
};
