import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    newsListing: {
        paddingHorizontal: 10,
    },
    newsItem: {
        position: 'relative',
        marginBottom: 10,
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#FFF'
    },
    newsImage: {
        width: width - 20,
        height: width / 2
    },
    newsInfo: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    newsTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    newsDateId: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    newsViewAll: {
        flex: 1,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    newsViewAllText: {
        fontWeight: '700',
        color: colors.main,
    }
});