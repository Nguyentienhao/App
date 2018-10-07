import {Dimensions, Platform} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../../configs/colors';

const { width, height } = Dimensions.get("window");

export default styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
    },
    listTrans:{
        flex:1
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    whenActive: {
        borderBottomWidth: 2,
        borderBottomColor: colors.main,
    },
    whenActiveColor: {
        color: colors.main
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
    viewHeader:{
        height:55,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc',
        flexDirection:'row'
    },
    textHeader:{
        color:'#000000',
        paddingTop:10,
        fontSize:20,
        flex:0.6,
        textAlign:'center',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderContainer: {
        flex: 1,
        paddingBottom: 16
    },
    orderToggleIcon: {
        width: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    orderItemsContainer: {
        marginTop: 15
    },
    productName: {
        color: '#cbcbcb',
        fontWeight: 'normal',
        flex: 0.6,
        fontSize: 12
    },
    submitButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    submitButton: {
        height: 30,
        width: width/2,
        borderRadius: 10,
        backgroundColor: '#3b95f2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderCode: {
    }
});
