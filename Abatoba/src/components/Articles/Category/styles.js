import { Dimensions } from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const { width, height } = Dimensions.get("window");

export default EStyleSheet.create({
    listCateHome: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listCate: {
        alignItems: 'flex-start',
        padding: 5,
        marginBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        backgroundColor: colors.bgMain
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
        borderBottomColor: colors.active,
    },
    whenActiveColor: {
        color: colors.active
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
    listTxtMore: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textColorSecondary,
        position: 'relative',
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    btnMore: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalScroll: {
        backgroundColor: '#FFF',
        borderTopColor: '#ccc',
        borderTopWidth: .5,
    },
    modal: {
        padding: 10,
        marginHorizontal: 10,
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    modalItem: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    }
});