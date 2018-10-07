import {Dimensions} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    spinner: {
        paddingTop: 10
    },
    cartHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5,
        paddingHorizontal: 15
    },
    cartHeaderButtonHolder: {
        backgroundColor: '#fff',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: colors.textColor,

    },
    cartHeaderButton: {
        textAlign: 'center',
        color: colors.textColor,
        padding: 5
    },
    cartHeaderText: {
        color: colors.main,
        paddingTop: 12,
        paddingBottom: 12
    },
    cartPaymentHolder: {
        paddingHorizontal: 15
    },
    cartRadioHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width / 1.5,
        marginBottom: 5
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    iconInput: {
        color: colors.textColorSecondary,
        minWidth: 50,
    },
    userInput: {
        flex: 1,
        borderBottomWidth: 1.5,
        paddingBottom: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    tabBar: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        backgroundColor: colors.bgMain
    },
    headerLabel: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.textColorSecondary,
        position: 'relative',
        bottom: -1,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    inputLabel: {
        padding: 10,
        paddingTop: 14
    },
    inputSpecialLabel: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 14
    },
    input:{
        fontWeight: 'bold',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#757575',
        paddingBottom: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        minHeight: 30,
    },
    inputSpecial:{
        fontWeight: 'bold',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#757575',
        paddingBottom: 10,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 16,
        minHeight: 30,
        width: width/4,
    },
    labelView: {
        paddingBottom: 10
    },
    formgroupWapper:{
        paddingLeft: 25,
        paddingRight: 25,
    },
    formButton:{
        marginBottom: 56,
    },
    submitButton:{
        backgroundColor: colors.activeTintColor,
        borderRadius: 2,
        marginTop: 16,
    },
    cancelButton:{
        backgroundColor: colors.inactiveTintColor,
        borderRadius: 2,
        marginTop: 16,
    },
    submitText:{
        textAlign: 'center',
        color: "#fff",
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 12,
    },
});