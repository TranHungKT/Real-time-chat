import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface ButtonSvgProps {
  iconSvg: string;
  onPress: () => void;
}

export const ButtonSvg = (props: ButtonSvgProps) => {
  const { iconSvg, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <SvgXml xml={iconSvg} />
    </TouchableOpacity>
  );
};
