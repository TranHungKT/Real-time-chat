import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { deviceHeight } from '@Constants/index';
import { palette } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  buttonView: ViewStyle;
  content: TextStyle;
  cancelButton: ViewStyle;
  deleteButton: ViewStyle;
  cancelButtonContent: TextStyle;
  deleteButtonContent: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: palette.white,
    marginHorizontal: 50,
    maxHeight: 160,
    marginTop: deviceHeight / 2 - 100,
    borderRadius: 20,
    alignContent: 'center',
    paddingTop: 20,
  },

  buttonView: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    marginTop: 30,
    justifyContent: 'space-between',
  },

  content: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },

  cancelButton: {
    flex: 0.5,
    borderRightWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
  },

  deleteButton: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 20,
  },

  cancelButtonContent: {
    color: palette.blue,
    fontSize: 18,
  },

  deleteButtonContent: {
    color: palette.red,
    fontSize: 18,
  },
});
