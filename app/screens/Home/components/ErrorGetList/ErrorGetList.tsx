import { EmptyOrErrorContent, SnackBarError } from '@Components/index';
import { IMAGES } from '@Themes/index';

export const ErrorGetList = () => {
  return (
    <>
      <EmptyOrErrorContent
        source={IMAGES.Error}
        title="We found some errors when trying get your chats"
        subTitle="Please try again later"
      />
      <SnackBarError isError />
    </>
  );
};
