import { SafeAreaView, Text, View } from 'react-native';

import { styles } from './GroupChatInformationScreenStyles';
import { Header } from './components';
import { GroupChatTab } from './navigators';

export const GroupChatInformationScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.phoneTitle}>Phone Number</Text>
        <Text style={styles.phoneNumber}>+375(29)9239003</Text>
      </View>
      <GroupChatTab />
    </SafeAreaView>
  );
};
