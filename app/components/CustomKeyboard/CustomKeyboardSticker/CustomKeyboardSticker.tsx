import Lottie from 'lottie-react-native';
import { FlatList } from 'react-native';
import { Text, View } from 'react-native';
import { Keyboard } from 'react-native-ui-lib';

import sticker1 from '../../../../assets/stickers/1.json';
import sticker2 from '../../../../assets/stickers/2.json';
import sticker3 from '../../../../assets/stickers/3.json';
import sticker4 from '../../../../assets/stickers/4.json';
import sticker5 from '../../../../assets/stickers/5.json';
import sticker6 from '../../../../assets/stickers/6.json';

const KeyboardRegistry = Keyboard.KeyboardRegistry;
const listOfLottieFiles = [sticker1, sticker2, sticker3, sticker4, sticker5, sticker6];
export const CustomKeyboardSticker = () => {
  return (
    <>
      <Text>hadshasdhahsdhasdhasdhadshasdhasdh</Text>
      <FlatList
        data={listOfLottieFiles}
        renderItem={(item) => (
          <View key={item.index}>
            <Lottie source={item.item} autoPlay loop style={{ width: 100, height: 100 }} />
          </View>
        )}
        numColumns={3}
      />
    </>
  );
};

KeyboardRegistry.registerKeyboard('unicorn.stickerKeyboard', () => CustomKeyboardSticker);
