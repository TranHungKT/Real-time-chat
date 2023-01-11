import { flattenDeep, map } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { PAGE_SIZE, SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { fetchListGroups, fetchUserStatus } from '@Services/index';
import { getGroupsSelector, groupsActions } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userActions, userIdSelector, userTokenSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

import { styles } from './HomeStyles';
import { RenderListGroups, EmptyListOfGroups, ErrorGetList, Header } from './components';

export const HomeScreen = () => {
  const token = useSelector(userTokenSelector);
  const userId = useSelector(userIdSelector);
  const groups = useSelector(getGroupsSelector);
  const dispatch = useAppDispatch();
  const socket = useContext(WebSocketContext);

  const {
    data: listGroups,
    isFetching,
    error,
  } = useQuery(
    ['getListGroups', token],
    () =>
      // TODO: PAGINATION HERE
      fetchListGroups({ token, pageNumber: 1, pageSize: PAGE_SIZE }),
    {
      keepPreviousData: false,
    },
  );

  const { data: usersStatus } = useQuery(
    ['getStatus', token],
    () => {
      const ids = listGroups?.list.map((group) => {
        return group.members.filter((member) => member._id !== userId);
      });

      return fetchUserStatus({ token, ids: map(flattenDeep(ids), '_id') });
    },
    {
      enabled: !!listGroups?.list.length,
      refetchInterval: 3000000,
    },
  );

  const renderComponent = () => {
    if (isFetching) {
      return <ActivityIndicator animating={true} style={styles.activityIndicator} />;
    }

    if (error) {
      return <ErrorGetList />;
    }

    if (isEmpty(groups)) {
      return <EmptyListOfGroups />;
    }

    return (
      <View style={styles.content}>
        <RenderListGroups groups={Object.values(groups)} />
      </View>
    );
  };

  useEffect(() => {
    if (listGroups) {
      dispatch(groupsActions.setGroups({ data: listGroups, userId }));
      listGroups.list.forEach((group) => socket.emit(SOCKET_EVENTS.JOIN_ROOM, group._id));
    }
  }, [listGroups, dispatch, socket, userId]);

  useEffect(() => {
    if (usersStatus) {
      dispatch(userActions.setUsersStatus(usersStatus));
    }
  }, [dispatch, usersStatus]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Header />
      </View>
      {renderComponent()}
    </SafeAreaView>
  );
};
