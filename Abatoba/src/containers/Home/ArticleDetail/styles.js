import {Dimensions, Platform} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';
const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
    },
    search: {
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 12,
    },
    section: {
        marginTop: 12,
        flex: 1,
        backgroundColor: '#eee'
    },
    sectionHeader: {
        paddingHorizontal: 12,
        backgroundColor: '#f6f6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionHeaderText: {
        color: '#606060',
        fontSize: 15,
        lineHeight: 30,
        marginRight: 12
    },
    recentList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#fff'
    },
    recentItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5
    },
    recentItemImage: {
        width: width/2 - 20,
        height: 100,
        flex: 1
    },
    recentItemInfo: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    recentItemAddress: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    recentItemPrice: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    topLeft: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    artDesBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204, 204, 204, 1)'
    },
    tabBar: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        backgroundColor: colors.bgMain
    },
    artRelatedItem: {
        width: width,
        flexDirection: 'row',
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204, 204, 204, 1)',
    },
    artRelatedInfo: {
        width: width,
        paddingHorizontal: 12,
    },
    artRelatedDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    artRelatedTitle: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 5,
    },
    artRelatedLabel: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textColorSecondary,
        position: 'relative',
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    }
});