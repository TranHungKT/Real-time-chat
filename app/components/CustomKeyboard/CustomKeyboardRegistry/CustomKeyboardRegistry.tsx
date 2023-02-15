/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { MotiView } from 'moti';
import { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Keyboard, View, Button } from 'react-native-ui-lib';
import { palette } from 'themes';

import '../../demoKeyboards';
import '../CustomKeyboardSticker/CustomKeyboardSticker';
import { styles } from './CustomKeyboardRegistryStyle';

const { KeyboardAccessoryView, KeyboardUtils, KeyboardRegistry } = Keyboard;

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
  const [customKeyboard, setCustomKeyboard] = useState<any>({
    component: undefined,
    initialProps: undefined,
  });
  const [currentText, setCurrentText] = useState('');
  const [focus, setForcus] = useState(false);
  const [useSafeArea, setUseSafeArea] = useState(true);
  const [keyboardOpenState, setKeyboardOpenState] = useState(false);

  const onKeyboardResigned = () => {
    resetKeyboardView();
  };

  const isCustomKeyboardOpen = () => {
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  };

  const resetKeyboardView = () => {};

  const dismissKeyboard = () => {
    KeyboardUtils.dismiss();
  };

  const toggleUseSafeArea = () => {
    setUseSafeArea(!useSafeArea);

    if (isCustomKeyboardOpen()) {
      dismissKeyboard();
    }
  };

  let textRef = useRef<typeof TextInput>();

  const showKeyboardView = (component: any, title: any) => {
    setKeyboardOpenState(true);
    setCustomKeyboard({
      component,
      initialProps: { title },
    });
  };

  const renderKeyboardAccessoryViewContent = () => {
    return (
      // <View style={styles.keyboardContainer} paddingV-s4>
      //   <View bg-white row spread centerV paddingH-s5 paddingV-s3>
      //     <TextInput
      // ref={(r: any) => {
      //   console.log('Re', r);
      //   textRef.current = r;
      // }}
      //       placeholder="asdads"
      //     />

      //     <Button link grey10 onPress={KeyboardUtils.dismiss} marginL-s2 />
      //   </View>
      //   <View row paddingH-s4 marginT-s2 spread>
      //     <View row>
      //       {registry.map((keyboard) => (
      //         <Button
      //           key={keyboard.id}
      //           grey10
      //           link
      //           label="hellos"
      //           onPress={() => showKeyboardView(keyboard.id, '')}
      //           marginR-s2
      //         />
      //       ))}
      //     </View>

      //     <Button grey10 label="Reset" link onPress={resetKeyboardView} />
      //   </View>
      // </View>
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
              onPress={() => showKeyboardView(keyboard.id, '')}
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
            underlineColorAndroid="transparent"
            ref={(r: any) => {
              textRef.current = r;
            }}
          />
        </MotiView>
      </View>
    );
  };

  const onRequestShowKeyboard = () => {
    setCustomKeyboard({
      component: registry[0].id,
      initialProps: { title: 'Keyboard 1 opened by button' },
    });
  };

  return (
    <View>
      <KeyboardAccessoryView
        renderContent={renderKeyboardAccessoryViewContent}
        kbInputRef={textRef.current}
        kbComponent={customKeyboard.component}
        onRequestShowKeyboard={onRequestShowKeyboard}
        kbInitialProps={customKeyboard.initialProps}
        onKeyboardResigned={onKeyboardResigned}
        revealKeyboardInteractive
        useSafeArea={useSafeArea}
        addBottomView={useSafeArea}
        // usesBottomTabs={!isModal}
      />
    </View>
  );
};
