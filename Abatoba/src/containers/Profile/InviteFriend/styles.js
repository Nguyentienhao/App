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
    feedbackSection: {
        flex: 2,
        padding: 10,
    },
    rowInfo: {
        padding: 14,
        fontSize: 14,
        color: colors.textColor,
    },
    labelIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
    sendBtn: {
        alignItems: 'flex-end',
        marginTop: 10,
        marginRight: 5
    }
});
