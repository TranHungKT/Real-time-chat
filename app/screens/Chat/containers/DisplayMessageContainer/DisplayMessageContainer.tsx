import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage, BubbleProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { NewMessageContent } from '@Models/index';
import { getCurrentGroupIdSelector } from '@Stores/groups';
import { userDataSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

import { RenderBubbleMessage } from '../../components/RenderBubbleMessage';
import { RenderScrollToBottom } from '../../components/RenderScrollToBottom';
import { RenderActionsMessageContainer } from '../RenderActionsMessageContainer';
import { TypingContainer } from '../TypingContainer';
import { styles } from './DisplayMessageContainerStyles';

interface DisplayMessageContainerProps {
  messages?: IMessage[];
  count?: number;
  isTyping: boolean;
  onTextInputChanged: (text: string) => void;
  onSendMessages: (newMess: NewMessageContent[]) => void;
  onLoadEarlierMessages: () => void;
}

export const DisplayMessageContainer = (props: DisplayMessageContainerProps) => {
  const { messages, onTextInputChanged, onSendMessages, isTyping, onLoadEarlierMessages, count } =
    props;
  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);

  const [customText, setCustomText] = useState('');

  const handleSendMessage = useCallback(
    (newMessages: IMessage[] = []) => {
      const newMess = newMessages.map((message) => ({
        text: message.text,
        listImages: message.listImages?.length ? message.listImages : undefined,
        image: message.listImages?.length ? 'image' : undefined,
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
    (fileUrls: string[]) => {
      onSendMessages([
        {
          listImages: fileUrls,
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

  const isLoadEarlier = () => messages?.length !== count;

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

  const renderScrollToBottomComponent = () => {
    return <RenderScrollToBottom />;
  };

  return (
    <>
      <GiftedChat
        messages={messages}
        text={customText}
        user={generateUser()}
        onInputTextChanged={handleTextInputChanged}
        onSend={handleSendMessage}
        keyboardShouldPersistTaps="never"
        forceGetKeyboardHeight={true}
        loadEarlier={isLoadEarlier()}
        onLoadEarlier={onLoadEarlierMessages}
        renderFooter={renderFooter}
        renderBubble={renderBubble}
        renderActions={renderActions}
        renderChatFooter={renderChatFooter}
        infiniteScroll
        scrollToBottom
        scrollToBottomComponent={renderScrollToBottomComponent}
        scrollToBottomStyle={styles.scollBottomStyle}
      />
    </>
  );
};
