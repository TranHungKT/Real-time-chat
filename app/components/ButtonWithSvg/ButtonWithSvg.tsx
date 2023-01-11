import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface ButtonWithSvgProps {
  iconSvg: string;
  onPress: () => void;
}

export const ButtonWithSvg = (props: ButtonWithSvgProps) => {
  const { iconSvg, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <SvgXml xml={iconSvg} />
    </TouchableOpacity>
  );
};
