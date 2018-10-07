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
        color: colors.main,
        minWidth: 50,
    },
    userInput: {
        flex: 1,
        borderBottomWidth: 1.5,
        paddingBottom: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    cartInput: {
        marginTop: 5,
        paddingHorizontal: 9,
        width: width - 20
    },
    cartOrderButton: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 15
    },
    cartOrderButtonText: {
        textAlign: 'center',
        color: '#fff',
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: colors.btnPrimary
    },
});