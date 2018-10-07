import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    searchBar: {
        backgroundColor: colors.bgPrimary,
        paddingVertical: 10,
        flexDirection: 'row',
        paddingRight: 15,
    },
    searchBarInput: {
        backgroundColor: '#FFF',
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 3,
        flex: 1,
        marginRight: 15
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});