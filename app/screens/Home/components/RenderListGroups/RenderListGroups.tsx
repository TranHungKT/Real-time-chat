import { View, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Group } from '@Models/index';

import { GroupContainer } from '../../containers/GroupContainer';

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
      renderHiddenItem={() => (
        <View>
          <Text>Left</Text>
          <Text>Right</Text>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};
