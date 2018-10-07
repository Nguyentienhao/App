import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
        borderBottomColor: colors.main,
    },
    whenActiveColor: {
        color: colors.main
    },
    proName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        position: 'relative',
    },
    proBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204, 204, 204, 1)',
        flex: 1
    },
    proInfo:{
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    proPriceHolder: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    proNormalPrice: {
        color: colors.textColorSecondary,
        textDecorationLine: 'line-through',
        paddingRight: 10
    },
    proId: {
        color: colors.textColorSecondary
    },
    proFinalPrice: {
        color: colors.main,
    },
    proAttrLabel:{
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    proAttrBlock: {
        flexDirection: 'column',
        marginBottom: 10,
        flexWrap: 'wrap',
        // position: 'relative',
    },
    proAttrDetailBlock: {
        flexDirection: 'row',
        marginBottom: 10,
        flexWrap: 'wrap',
        // position: 'relative',
    },
    proAttrQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    proAttrInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginLeft: 15
    },
    proAttrCircle: {
        width: 36,
        height: 36,
        borderColor: colors.textColorSecondary,
        borderWidth: 1,
        borderRadius: 18,
        overflow: 'hidden',
        marginRight: 7,
        marginBottom: 7,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    proAttrSquare: {
        borderColor: colors.textColorSecondary,
        color: colors.textColorSecondary,
        borderWidth: 1,
        borderRadius: 3,
        width: 36,
        height: 36,
        lineHeight: 36,
        textAlign: 'center',
    },
    proQuantityCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    proQuantityCountBtn:{
        marginRight: 5,
    },
    proQuantityCountTxt:{
        marginRight: 5,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(204, 204, 204, 0.8)'
    },
    proAddToCart: {
        backgroundColor: colors.btnPrimary,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 3,
        alignSelf: 'flex-end',
    },
    proCloseModal: {
        marginLeft: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 3,
        borderColor: 'rgba(204, 204, 204, 0.8)',
        borderWidth: 0.5,
        alignSelf: 'flex-end',
    }
});
