import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  buttonView: ViewStyle;
  textField: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },

  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textField: {
    height: 40,
    borderRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 0,
  },
});
