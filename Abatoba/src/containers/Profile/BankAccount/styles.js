import {Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../../configs/colors";

const {width, height} = Dimensions.get("window");

export default styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // marginBottom: 10,
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
    viewHeader: {
        height: 55,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row'
    },
    textHeader: {
        color: '#000000',
        paddingTop: 10,
        fontSize: 20,
        flex: 0.6,
        textAlign: 'center',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        // paddingHorizontal: 10,
    },
    formButton:{
        paddingHorizontal: 5,
        flex: 1
    },
    formgroupWapper:{
        paddingLeft: 25,
        paddingRight: 25,
    },
    submitButton:{
        backgroundColor: colors.activeTintColor,
        borderRadius: 2,
        marginTop: 16,
    },
    inputView:{
        flex: 1,
        paddingBottom: 5,
        marginTop:5
    },
    inputLabel: {
        fontSize: 15,
        color: colors.textColorSecondary,
    },
    inputValue: {
        fontSize: 14,
        maxWidth: width*2/3
    },
    inputSpecialLabel: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 14
    },
    submitText:{
        textAlign: 'center',
        color: "#fff",
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 12,
    },
    input:{
        fontWeight: 'bold',
        // flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204, 204, 204, 1)',
        paddingBottom: 2,
        paddingHorizontal: 2,
        marginBottom: 5,
        fontSize: 16,
        minHeight: 30,
        width: width*2/3 - 10,
        color: '#5a5a58'
    },
    inputSpecial:{
        fontWeight: 'bold',
        flex: 1,
        color: '#5a5a58',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204, 204, 204, 1)',
        paddingBottom: 2,
        marginBottom: 5,
        fontSize: 16,
        minHeight: 30,
        textAlign: 'center',
        width: width/6,
    },
    cancelButton:{
        backgroundColor: colors.inactiveTintColor,
        borderRadius: 2,
        marginTop: 16,
    },
});
