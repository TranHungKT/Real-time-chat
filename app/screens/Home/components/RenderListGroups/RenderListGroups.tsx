import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

import { deviceWidth } from '@Constants/index';
import { Group } from '@Models/index';

import { GroupContainer } from '../../containers/GroupContainer';
import { HiddenItemGroup } from '../HiddenItemGroup/HiddenItemGroup';

interface RenderListGroupsProps {
  groups: Group[];
}

export const RenderListGroups = (props: RenderListGroupsProps) => {
  const { groups } = props;

  const renderGroupItem = ({ item }: { item: Group }) => {
    return <GroupContainer group={item} key={item._id} />;
  };

  const renderHiddenItem = ({ item }: { item: Group }, rowMap: RowMap<Group>) => {
    const handleCloseRow = () => {
      rowMap[item._id].closeRow();
    };

    return <HiddenItemGroup groupId={item._id} onCloseRow={handleCloseRow} />;
  };

  return (
    <SwipeListView
      data={groups}
      renderItem={renderGroupItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={deviceWidth * -0.6}
      disableRightSwipe
      rightActionValue={-100}
      keyExtractor={(item) => item._id}
      closeOnRowBeginSwipe
    />
  );
};
