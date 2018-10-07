import { Dimensions } from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const { width, height } = Dimensions.get("window");

export default EStyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 0,
    },
    listCate: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabBarButton: {
        paddingVertical: 10,
        paddingHorizontal: 7,
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        zIndex: 1,
        position: 'relative',

    },
    whenActive: {
        borderBottomColor: colors.main,
    },
    whenActiveColor: {
        color: colors.main
    },
    tabBarText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textColorSecondary,
    },
    txtMore: {
        fontWeight: 'bold',
        color: colors.textColorSecondary,
    },
    btnMore: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        left: 0,
        bottom: 0,
        right: 0,
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.bgPrimary,
        position: 'absolute',
        borderTopColor: 'rgba(255,255,255,0.8)',
        borderTopWidth: EStyleSheet.hairlineWidth,
    },
    modalItem: {
        padding: 5,
    }
});