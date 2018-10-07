import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
        paddingTop: 20,
    },
    search: {
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 12,
    },
    section: {
        marginTop: 12,
        flex: 1,
        backgroundColor: colors.bgMain
    },
    cateSectionHeader: {
        paddingHorizontal: 12,
        paddingBottom: 12,
        backgroundColor: colors.bgMain,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cateViewMore: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: colors.main
    },
    cateTabBarButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textColorSecondary,
        position: 'relative',
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    sectionHeaderText: {
        color: '#606060',
        fontSize: 15,
        lineHeight: 30,
        marginRight: 12
    },
    cateChildList: {
        paddingHorizontal: 10,
        overflow: 'visible',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 0.5,
        justifyContent: 'space-between',
    },
    cateItem: {
        flex: 1,
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden'
    },
    cateItemHolder:{
        width: '33.33%',
        height: (width / 3),
        padding: 5
    },
    cateList: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    cateChildItem: {
        width: (width / 2 - 12),
        marginBottom: 5,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(224, 224, 224, 0.3)',
        flexDirection: 'row'
    },
    cateItemImage: {
        width: (width / 3 - 5),
        height: (width / 3 - 5),
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#ccc',
        borderRadius: 3,
    },
    cateChildItemImage: {
        width: (width / 6 - 12),
        height: (width / 6 - 12),
        borderWidth: 1,
        borderColor: 'rgba(204, 204, 204, 0.2)',
    },
    cateItemName: {
        paddingHorizontal: 2,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(49, 44, 44, 0.5)',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        borderRadius: 3,
    },
    cateChildItemName: {
        paddingHorizontal: 2,
        justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    cateItemNameText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '900',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowRadius: 1
    },
    cateChildItemNameText: {
        fontSize: 10,
        paddingLeft: 5,
        color: '#000',
        fontWeight: '700',
        textAlign: 'left',
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
        width: width / 2 - 20,
        height: 100,
        flex: 1,
    },
    recentItemInfo: {
        flex: 1,
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
        flex: 1,
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
    },
});