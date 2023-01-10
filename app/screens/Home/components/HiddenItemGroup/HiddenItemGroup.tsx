import { View } from 'react-native';

import { ButtonSvg } from '@Components/index';
import { AchiveChatSvg, SeenMessageSvg } from '@Constants/index';

import { DeleteGroupContainer } from '../../containers/DeleteGroupContainer';
import { styles } from './HiddenItemGroupStyle';

export const HiddenItemGroup = () => {
  return (
    <View style={styles.container}>
      <ButtonSvg onPress={() => {}} iconSvg={AchiveChatSvg} />
      <ButtonSvg onPress={() => {}} iconSvg={SeenMessageSvg} />
      <DeleteGroupContainer />
    </View>
  );
};
