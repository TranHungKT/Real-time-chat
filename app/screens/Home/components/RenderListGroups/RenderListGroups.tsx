import { SwipeListView } from 'react-native-swipe-list-view';

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

  return (
    <SwipeListView
      data={groups}
      renderItem={renderGroupItem}
      renderHiddenItem={() => <HiddenItemGroup />}
      rightOpenValue={deviceWidth * -0.6}
      disableRightSwipe
      rightActionValue={-100}
    />
  );
};
