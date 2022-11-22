import axios from 'axios';

import { BASE_URL } from '@Configs/index';
import { User } from '@Models/index';

export const fetchUserData = async (token: string): Promise<Omit<User, 'accessToken'>> => {
  try {
    const response = await axios.get(`${BASE_URL}user-data`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const fetchUserStatus = async ({ token, ids }: { token: string; ids: string[] }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}connect-status`,
      {
        ids,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};
