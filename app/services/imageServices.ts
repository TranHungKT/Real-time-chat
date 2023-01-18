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

  images.forEach((image) => {
    formData.append('photos', {
      name: image.fileName,
      uri: image.uri,
      type: image.type,
    } as any);
  });

  return axios.post(`${BASE_URL}upload-image`, formData, {
    headers: {
      Accept: 'application/json',
      'Content-type': 'multipart/form-data',
      authorization: `Bearer ${accessToken}`,
    },
  });
};
