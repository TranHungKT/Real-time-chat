import axios from 'axios';
import { IMessage } from 'react-native-gifted-chat';

import { BASE_URL } from '@Configs/index';
import { GetListGroupResponse } from '@Models/index';

interface GetListPayload {
  token: string;
  pageSize: number;
  pageNumber: number;
}

interface GetListPayloadWithGroupId extends GetListPayload {
  groupId?: string;
}

export const fetchListGroups = async ({
  pageNumber,
  pageSize,
  token,
}: GetListPayload): Promise<GetListGroupResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}get-list-groups?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const fetchListMessages = async ({
  token,
  pageSize,
  pageNumber,
  groupId,
}: GetListPayloadWithGroupId): Promise<{
  groupId: string;
  list: IMessage[];
  count: number;
}> => {
  try {
    const response = await axios.get(
      `${BASE_URL}list-message?groupId=${groupId}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
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

export const fetchImagesOfGroups = async ({
  token,
  groupId,
}: {
  token: string;
  groupId: string;
}): Promise<{ id: string; image: string }[]> => {
  try {
    const response = await axios.get(`${BASE_URL}get-list-images?groupId=${groupId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteGroupService = async ({
  token,
  groupId,
}: {
  token: string;
  groupId: string;
}) => {
  try {
    return await axios.delete(`${BASE_URL}delete-group?groupId=${groupId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
