import { Dimensions } from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../configs/colors';

const { width, height } = Dimensions.get("window");

export default styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingVertical: 15,
        paddingRight: 20,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: EStyleSheet.hairlineWidth,
    },
    innerLeft: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    innerIcon: {
        minWidth: 24,
    },
    rowText: {
        fontSize: 16,
        marginLeft: 10,
    },
});