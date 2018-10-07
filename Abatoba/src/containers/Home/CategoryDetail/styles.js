import {Dimensions, Platform} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
        paddingTop: 6,
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
    categoryItemImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    categoriesList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#fff'
    },
    categoryItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
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
    listItemImage: {
        width: 60,
        height: 60,
        flex: 1
    },
    listItem: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    listItemInfo: {
        flex: 3.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    listContainer: {
        backgroundColor: '#fff'
    }
});