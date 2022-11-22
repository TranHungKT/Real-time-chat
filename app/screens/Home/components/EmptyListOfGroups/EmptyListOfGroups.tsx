import { EmptyOrErrorContent } from '@Components/index';
import { IMAGES } from '@Themes/index';

export const EmptyListOfGroups = () => {
  return (
    <EmptyOrErrorContent
      source={IMAGES.Empty}
      title="You haven't chat yet"
      subTitle="Let's start new chat"
    />
  );
};
