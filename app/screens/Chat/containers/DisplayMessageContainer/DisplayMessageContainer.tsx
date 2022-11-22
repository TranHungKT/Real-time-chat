import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage, BubbleProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { NewMessageContent } from '@Models/index';
import { getCurrentGroupIdSelector } from '@Stores/groups';
import { userDataSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

import { RenderBubbleMessage } from '../../components/RenderBubbleMessage';
import { RenderActionsMessageContainer } from '../RenderActionsMessageContainer';
import { TypingContainer } from '../TypingContainer';
import { styles } from './DisplayMessageContainerStyles';

interface DisplayMessageContainerProps {
  messages?: IMessage[];
  isTyping: boolean;
  onTextInputChanged: (text: string) => void;
  onSendMessages: (newMess: NewMessageContent[]) => void;
}

export const DisplayMessageContainer = (props: DisplayMessageContainerProps) => {
  const { messages, onTextInputChanged, onSendMessages, isTyping } = props;
  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);

  const [customText, setCustomText] = useState('');

  const handleSendMessage = useCallback(
    (newMessages: IMessage[] = []) => {
      const newMess = newMessages.map((message) => ({
        text: message.text,
        image: message.image,
      }));
      onSendMessages(newMess);
    },
    [onSendMessages],
  );

  const handleTextInputChanged = (text: string) => {
    setCustomText(text);
    onTextInputChanged(text);
  };

  const handleChooseImage = useCallback(
    (fileUrl: string) => {
      onSendMessages([
        {
          image: fileUrl,
        },
      ]);
    },
    [onSendMessages],
  );

  const generateUser = () => {
    return {
      _id,
      name: generateName({ firstName, lastName }),
      avatar: avatarUrl,
    };
  };

  const renderFooter = () => {
    return <TypingContainer groupId={currentGroupId || ''} isTyping={isTyping} />;
  };

  const renderBubble = (message: BubbleProps<IMessage>) => {
    return (
      <RenderBubbleMessage bubbleMessages={message} userId={_id} groupId={currentGroupId || ''} />
    );
  };

  const renderActions = () => {
    return <RenderActionsMessageContainer onChooseImage={handleChooseImage} />;
  };

  const renderChatFooter = () => {
    return <View style={styles.chatFooter} />;
  };

  return (
    <GiftedChat
      messages={messages}
      text={customText}
      user={generateUser()}
      onInputTextChanged={handleTextInputChanged}
      onSend={handleSendMessage}
      keyboardShouldPersistTaps="never"
      forceGetKeyboardHeight={true}
      renderFooter={renderFooter}
      renderBubble={renderBubble}
      renderActions={renderActions}
      renderChatFooter={renderChatFooter}
    />
  );
};
