import { Dimensions } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';

export default styles = EStyleSheet.create({
    uploadphotoWapper: {
        alignItems: 'center',
        marginBottom: 24,
    },
    container: {
        paddingTop: 24,
    },
    uploadphoto: {
        backgroundColor: '#e0e0e0',
        borderRadius: 100,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formButton: {
        marginBottom: 56,
    },
    input: {
        fontWeight: 'bold',
        flex: 1,
    },
    birthdayView: {
        borderBottomWidth: 1,
        borderBottomColor: '#757575',
        paddingBottom: 16,
    },
    birthdayText: {
        color: '#757575',
        fontWeight: 'bold',
        fontSize: 18
    },
    birthdayWapper: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: -8,
    },
    modalInput: {
        borderWidth: 0,
    },
    birthdayFormGroup: {
        width: '50%',
        paddingLeft: 8,
        paddingRight: 8,
        display: 'flex',
    },
    formGroup: {
        flexDirection: 'row'
    },
    icon: {
        color: '#757575',
        fontSize: 28,
        textAlign: 'center',
        minWidth: 24
    },
    formgroupWapper: {
        paddingLeft: 25,
        paddingRight: 25,
    },
    registerButton: {
        backgroundColor: colors.activeTintColor,
        borderRadius: 2,
        marginTop: 16,
    },
    registerText: {
        textAlign: 'center',
        color: "#fff",
        fontWeight: 'bold',
        paddingTop: 12,
        paddingBottom: 12,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
        borderWidth: 3,
        borderColor: '#FFF',
    },
});