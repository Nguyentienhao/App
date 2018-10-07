import {Dimensions} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './../../../configs/colors';
const { width, height } = Dimensions.get("window");
export default styles = EStyleSheet.create({
    uploadphotoWapper:{
        alignItems: 'center',
        marginBottom: 24,
    },
    container:{
        paddingTop: 24,
        backgroundColor:'#fff',
    },
    uploadphoto:{
        backgroundColor: '#e0e0e0',
        borderRadius: 100,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formButton:{
        paddingHorizontal: 5,
        flex: 1
    },
    input:{
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        paddingBottom: 5,
    },
    inputView:{
        flex: 1,
        paddingBottom: 5,
        marginTop:5
    },
    birthdayView:{
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        paddingBottom: 16,
    },
    birthdayText:{
        color: '#757575',
    },
    space_left:{
        marginLeft: 15
    },
    birthdayWapper:{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 8,
        marginRight: -8,
    },
    modalInput:{
        borderWidth: 0,
    },
    birthdayFormGroup:{
        width: '50%',
        paddingLeft: 8,
        paddingRight: 8,
        display: 'flex',
    },
    formGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom:5
    },
    icon:{
        color: '#757575',
        fontSize: 20,
        textAlign: 'center',
        minWidth: 24,
        marginTop:5
    },
    formgroupWapper:{
        paddingLeft: 20,
        paddingRight: 20,
    },
    updateInfoButton:{
        backgroundColor: colors.activeTintColor,
        borderRadius: 2,
        marginTop: 5,
        borderWidth: 1,
        borderColor: colors.activeTintColor,
    },
    changePassButton:{
        borderWidth:1,
        borderColor:colors.activeTintColor,
        borderRadius: 2,
        marginTop: 5,
    },
    registerText:{
        textAlign: 'center',
        color: "#fff",
        padding: 7,
    },
    changePassButtonText:{
        textAlign: 'center',
        color: colors.activeTintColor,
        padding: 7,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 110/2,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    formGroupButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    modalContent: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    modalHolder: {
        flex:1,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        maxHeight: height / 2.5
    },
    buttonChangePass: {
        backgroundColor: colors.main,
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 3,
        alignSelf: 'flex-end',
    },
    buttonCancelChangePass: {
        marginLeft: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 3,
        borderColor: 'rgba(204, 204, 204, 0.8)',
        borderWidth: 0.5,
        alignSelf: 'flex-end',
    },
    inputChangePass:{
        fontWeight: 'bold',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(204, 204, 204, 1)',
        paddingBottom: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginHorizontal: 15,
        fontSize: 16,
        minHeight: 30,
        width: width - 80,
        color: '#5a5a58'
    },
});