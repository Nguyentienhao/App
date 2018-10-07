import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        backgroundColor: colors.bgMain,
        paddingBottom: 70
    },
    body: {},
    tabBar: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        marginHorizontal: 10,
    },
    whenActive: {
        borderBottomWidth: 2,
        borderBottomColor: colors.active,
    },
    whenActiveColor: {
        color: colors.active
    },
    tabBarButton: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textColorSecondary,
        position: 'relative',
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    fees: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
        paddingVertical: 6,
        marginVertical: 6
    },
    feeItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalContent: {
        flex:1,
        backgroundColor: "white",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    inputSection:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconInput:{
        width:80
    },
    userInput:{
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingLeft: 0,
        borderBottomWidth:1,
    },
    proNormalPrice: {
        color: colors.textColorSecondary,
        textDecorationLine: 'line-through',
        paddingRight: 10
    },
    proFinalPrice: {
        color: colors.textPrice,
    },
    listItemImage: {
        width: 60,
        height: 60,
        flex: 1
    },
});
