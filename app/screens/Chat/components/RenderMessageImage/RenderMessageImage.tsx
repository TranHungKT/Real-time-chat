import { IMessage, MessageImageProps } from 'react-native-gifted-chat';

import { RenderMoreOrEqualThreeImages } from '../RenderMoreOrEqualThreeImages/RenderMoreOrEqualThreeImages';
import { RenderOneImageMessage } from '../RenderOneImageMessage/RenderOneImageMessage';
import { RenderTwoImageMessage } from '../RenderTwoImageMessage/RenderTwoImageMessage';

interface RenderMessageImageProps {
  message: MessageImageProps<IMessage>;
  userId: string;
}

export const RenderMessageImage = (props: RenderMessageImageProps) => {
  const { message, userId } = props;

  if (!message.currentMessage) {
    return <></>;
  }

  const isMyMessage = (id?: string | number) => userId === id;

  const { listImages, user } = message.currentMessage;

  switch (listImages?.length) {
    case 1: {
      return <RenderOneImageMessage image={listImages[0]} isMyMessage={isMyMessage(user?._id)} />;
    }
    case 2: {
      return <RenderTwoImageMessage images={listImages} isMyMessage={isMyMessage(user?._id)} />;
    }
    default:
      return <RenderMoreOrEqualThreeImages images={listImages || []} />;
  }
};
