import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    spinner: {
        paddingTop: 10
    },
    body: {},
});