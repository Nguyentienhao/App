import { Dimensions } from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../configs/colors';

const { width, height } = Dimensions.get("window");

export default styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },
  feedbackSection: {
    flex: 2,
  },
  rowInfo: {
    padding: 14,
    fontSize: 14,
    color: colors.textColor,
  },
  sendBtnRow: {
    alignItems: 'flex-end',
    marginTop: 10,
    borderRadius: 2,
    backgroundColor: colors.main,
    alignSelf: 'flex-end',
  },
  fbFromUsername:{
    marginBottom: 15,
  },
  textArea:{
    paddingBottom: 15,
    color: colors.textColor,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
  sendBtn: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 7,
  }
});
