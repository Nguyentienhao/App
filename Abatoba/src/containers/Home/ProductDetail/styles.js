import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    body: {
        height: 'auto'
    },
    tabBar: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        backgroundColor: colors.bgMain
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
        borderBottomColor: 'rgba(204, 204, 204, 1)'
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
    },
    proAttrBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    proAttrInfo: {
        flexDirection: 'row',
    },
    proAttrCircle: {
        width: 36,
        height: 36,
        borderColor: colors.textColorSecondary,
        borderWidth: 1,
        borderRadius: 18,
        overflow: 'hidden',
        marginRight: 7,
        marginBottom: 7
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
        marginRight: 7,
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
    },
    proAddToCart: {
        backgroundColor: colors.main,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 3,
        alignSelf: 'flex-end',
    },
    proRelatedLabel: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textColorSecondary,
        position: 'relative',
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    listItemImage: {
        width: 60,
        height: 60,
        flex: 1
    },
});
