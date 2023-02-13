import { MotiView } from 'moti';
import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { Keyboard } from 'react-native-ui-lib';

import { palette } from '@Themes/index';

import '../../demoKeyboards';
import '../CustomKeyboardSticker';
import { styles } from './CustomKeyboardRegistryStyle';

const { KeyboardAccessoryView } = Keyboard;

const registry = [
  {
    id: 'unicorn.ImagesKeyboard',
    icon: 'file-image-outline',
  },
  {
    id: 'unicorn.stickerKeyboard',
    icon: 'emoticon-happy-outline',
  },
];

export const CustomKeyboardRegistry = () => {
  const [currentText, setCurrentText] = useState('');
  const [focus, setForcus] = useState(false);
  const renderContent = () => {
    return (
      <View style={styles.container}>
        <MotiView
          animate={{
            translateX: focus ? -100 : 0,
          }}
          style={styles.buttonView}
        >
          {registry.map((keyboard) => (
            <IconButton
              key={keyboard.id}
              onPress={() => {}}
              icon={keyboard.icon}
              color={palette.blue}
            />
          ))}
        </MotiView>

        <MotiView
          animate={{
            width: focus ? '100%' : '70%',
            translateX: focus ? -100 : 0,
          }}
          transition={{
            type: 'timing',
          }}
        >
          <TextInput
            placeholder="Aa"
            value={currentText}
            onChangeText={(text) => {
              setCurrentText(text);
            }}
            style={styles.textField}
            onFocus={() => setForcus(true)}
            onBlur={() => setForcus(false)}
            underlineColor="transparent"
            underlineColorAndroid="transparent"
          />
        </MotiView>
      </View>
    );
  };

  return <KeyboardAccessoryView renderContent={renderContent} />;
};
