import { Dimensions, Platform} from "react-native";

import EStyleSheet from 'react-native-extended-stylesheet';

import colors from './../../../configs/colors';

const {width, height} = Dimensions.get("window");

export default styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    viewHeader: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        marginBottom: 20,
    },
    textHeader: {
        color: '#000000',
        paddingTop: 10,
        fontSize: 16,
        flex: 0.6,
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#ffffff',
        alignSelf: 'center'
    },
    button: {
        marginTop: 15,
        height: 36,
        backgroundColor: colors.main,
        borderColor: colors.main,
        borderWidth: 1,
        borderRadius: 18,
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        width: width - 40,
    },
    formGroup: {
        width: width - 40,
        alignSelf: 'center'
    },
    userInput: {
        width: width - 40,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        // fontSize: 20
    },
    newPassInput: {
        width: width - 40,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        borderBottomWidth: 1
    },
    imgAccountView: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    }
});