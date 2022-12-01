import { Text } from 'react-native';

import { styles } from './DrawerTextStyles';

export const DrawerText = ({ text }: { text: string }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default DrawerText;
