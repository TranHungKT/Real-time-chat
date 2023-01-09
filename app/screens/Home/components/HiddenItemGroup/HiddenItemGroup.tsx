import { View } from 'react-native';

import { ButtonSvg } from '@Components/index';
import { AchiveChatSvg, DeleteSvg, SeenMessageSvg } from '@Constants/index';

import { styles } from './HiddenItemGroupStyle';

export const HiddenItemGroup = () => {
  return (
    <View style={styles.container}>
      <ButtonSvg onPress={() => {}} iconSvg={AchiveChatSvg} />
      <ButtonSvg onPress={() => {}} iconSvg={SeenMessageSvg} />
      <ButtonSvg onPress={() => {}} iconSvg={DeleteSvg} />
    </View>
  );
};
