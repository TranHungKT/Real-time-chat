import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { styles } from './DrawerIconStyles';

export const DrawerIcon = ({ icon }: { icon: string }) => {
  return (
    <View style={styles.icon}>
      <SvgXml xml={icon} />
    </View>
  );
};
