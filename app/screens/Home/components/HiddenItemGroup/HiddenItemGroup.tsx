import { View } from 'react-native';

import { ButtonSvg } from '@Components/index';
import { AchiveChatSvg, SeenMessageSvg } from '@Constants/index';

import { DeleteGroupContainer } from '../../containers/DeleteGroupContainer';
import { styles } from './HiddenItemGroupStyle';

interface HiddenItemGroupProps {
  groupId: string;
}

export const HiddenItemGroup = (props: HiddenItemGroupProps) => {
  return (
    <View style={styles.container}>
      <ButtonSvg onPress={() => {}} iconSvg={AchiveChatSvg} />
      <ButtonSvg onPress={() => {}} iconSvg={SeenMessageSvg} />
      <DeleteGroupContainer groupId={props.groupId} />
    </View>
  );
};
