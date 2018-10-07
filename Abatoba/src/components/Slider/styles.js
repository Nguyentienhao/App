import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    wrapper: {
        height: height / 3.5,
    },
    slide: {},
    slideImage: {
        width: width,
        height: height / 3.5,
    },
    slidePagination: {
        bottom: 10,
    },
    slideDot: {
        backgroundColor: 'rgba(255,255,255,.4)',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    dotActive: {
        backgroundColor: '#FFF',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    }
});