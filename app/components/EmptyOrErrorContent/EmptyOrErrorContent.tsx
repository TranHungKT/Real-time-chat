import { View, Image, Text, ImageSourcePropType } from 'react-native';

import { styles } from './EmptyOrErrorContentStyles';

interface EmptyOrErrorContentProps {
  title?: string;
  subTitle?: string;
  source: ImageSourcePropType;
}

export const EmptyOrErrorContent = (props: EmptyOrErrorContentProps) => {
  const { title, subTitle, source } = props;
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};
