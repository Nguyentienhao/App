import {
    Dimensions
} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';

import colors from './../../../configs/colors';

const { width } = Dimensions.get("window"); 
const MARGIN = 40;

export default styles = EStyleSheet.create({
    loginContainer: {
        alignItems: 'center',
        padding: 20,
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    headline: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconInput: {
        position: 'absolute',
        zIndex: 80,
        width: 22,
        height: 22,
        left: 17,
        top: 9,
        bottom: 9
    },
    userInput: {
        flex: 1,
        width: width - 40,
        height: 40,
        padding: 10,
        backgroundColor: "white",
        color: colors.textColorSecondary,
        paddingLeft: 45, 
        borderWidth: 1, 
        borderRadius: 15,      
    },
    btnLogin: {
        marginTop: 15,
        height: 36,
        backgroundColor: colors.btnPrimary,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 15
    },
    btnLoginText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginForgotBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        resizeMode: 'contain',
        width: width - 200
    },
    opaIconLogin: {
        width:60,
        height:60,
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconLogin: {
        color:'white'
    },
    imgRoate: {
        height: 25,
        width: 25
    },
    btnCircle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#FF9800',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#FF9800',
    },    
    buttonEye: {
        position: 'absolute',
        right: 15
    },
    textLoginWith: {
        color: "#818181"
    },
    viewTextLoginWith: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 15
    },
    viewBtnLoginWith: {
        width: '50%', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
});