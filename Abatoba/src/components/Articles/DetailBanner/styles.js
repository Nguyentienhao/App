import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from "react-native";

import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    image: {
        width: width,
        height: width / 2 + 20,
        resizeMode: 'cover'
    },
    banner: {
        position: 'relative',

    },
    banner_info: {
        position: 'absolute',
        left: 0,
        width: width,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    title: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 5,
    },
    time: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 4,
    },
    time_number: {
        color: '#b4c3c9'
    }
});