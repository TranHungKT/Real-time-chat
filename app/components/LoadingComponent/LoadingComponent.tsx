import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { styles } from './LoadingComponentStyles';

export const LoadingComponent = () => {
  return (
    <View style={styles.activity}>
      <ActivityIndicator />
    </View>
  );
};
