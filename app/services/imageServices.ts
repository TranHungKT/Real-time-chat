import axios from 'axios';
import { Asset } from 'react-native-image-picker';

import { BASE_URL } from '@Configs/index';

export const uploadImages = async ({
  images,
  accessToken,
}: {
  images: Asset[];
  accessToken: string;
}) => {
  const formData = new FormData();

  formData.append('photos', {
    name: images[0].fileName,
    uri: images[0].uri,
    type: images[0].type,
  } as any);

  return axios.post(`${BASE_URL}upload-image`, formData, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'multipart/form-data',
      authorization: `Bearer ${accessToken}`,
    },
  });
};
