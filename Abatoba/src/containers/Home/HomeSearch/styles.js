import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
    },
    body:{
        backgroundColor:'white',
    },
    listItemImage: {
        width: 60,
        height: 60,
        flex: 1
    },
    productsListing: {
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    productsSwipeable: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
    },
    productItem: {
        width: (width / 2 - 15),
        marginBottom: 10,
    },
    productItemImage: {
        width: (width / 2 - 15),
        height: (width / 2 - 15),
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#ccc',
    },
    productItemInfo: {
        padding: 10,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: '#fff',
    },
    productItemName: {
        color: '#212121',
    },
    productItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productItemID: {
        color: '#717171',
    },
    productItemPrice: {
        color: colors.main
    },
    homeViewAll: {
        flex: 1,
        alignItems: 'center',
        marginTop: 5,
    },
    homeViewAllText: {
        fontWeight: '700',
        color: colors.main,

    },
    productItemListView: {
        flexDirection: 'row',
        paddingBottom: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204, 204, 204, 1)',
    },
    productItemImageListView: {
        width: (width / 6 - 12),
        height: (width / 6 - 12),
        borderWidth: 0.5,
        borderColor: 'rgba(204, 204, 204, 1)',
        marginRight: 5
    },
    productItemInfoListView: {
        paddingHorizontal: 2,
        justifyContent: 'center',
        // alignItems: 'center',
        width: (width - (width / 6 - 12)*2 - 12),
        height: (width / 6 - 12),
    },
    productItemRowListView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    productItemButtonListView : {
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: (width / 6 - 12),
    },
    productItemNameListView: {
        color: '#212121',
        paddingBottom: 10
    },
    proNormalPrice: {
        color: colors.textColorSecondary,
        textDecorationLine: 'line-through',
        paddingRight: 10
    },
    proFinalPrice: {
        color: colors.main,
    },
    tabBar: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        backgroundColor: colors.bgMain
    },
    proRelatedLabel: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.main,
        position: 'relative',
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    }
});