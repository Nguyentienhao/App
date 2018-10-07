import * as Actions from "../actions";
import _ from  'lodash';
import {AsyncStorage} from "react-native";
import {setAuthParams} from '../services/api';
import Toast from 'react-native-simple-toast';
import {translate} from "../languages/locale";

const defaultState = {
    oUser: {},
    bIsLoggedIn: false,
    bIsLoading: false,
    error: "",
    bIsLoadedFromLocal: false,
    position: {
        coords: {
            latitude: 10.8093919,
            longitude: 106.6878915
        }
    },
    resetPasswordEmail: '',
    sUploadedAvatar: null,
    changePass: {
        isProcessing: false,
        isSuccess: null
    }
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case Actions.LOGIN:
            return {
                ...state,
                bIsLoading: true,
                error: ""
            };
        case Actions.LOGIN_SUCCESS:
            setAuthParams(action.payload);
            AsyncStorage.setItem('user', JSON.stringify(action.payload));
            let _newState = {...state};
            _newState.oUser = action.payload;
            _newState.bIsLoading = false;
            _newState.bIsLoggedIn = !_.isEmpty(_newState.oUser);
            return _newState;
        case Actions.LOGIN_FAIL:
            Toast.show(action.error);
            return {
                ...state,
                bIsLoggedIn: false,
                bIsLoading: false,
                error: action.error
            };
        case Actions.LOGOUT:
            return {
                ...state,
                oUser: {},
                bIsLoading: true,
            };
        case Actions.LOGOUT_SUCCESS:
            return {
                ...state,
                bIsLoggedIn: false,
                oUser: {},
                bIsLoading: false
            };
        case Actions.LOGOUT_FAIL:
            Toast.show("Đăng xuất thất bại");
            return {
                ...state,
                bIsLoading: false
            };
        case Actions.REGISTER:
            return {
                ...state,
                bIsLoading: true,
                error: ""
            };
        case Actions.REGISTER_SUCCESS:
            setAuthParams(action.payload);
            AsyncStorage.setItem('user', JSON.stringify(action.payload));
            _newState = {...state};
            _newState.oUser = action.payload;
            _newState.bIsLoading = false;
            _newState.bIsLoggedIn = !_.isEmpty(_newState.oUser);
            return _newState;
        case Actions.REGISTER_FAIL:
            return {
                ...state,
                bIsLoading: false,
                error: action.error
            };
        case Actions.SET_AUTH_FROM_LOCAL:
            setAuthParams(action.payload.user);
            return {
                ...state,
                oUser: action.payload.user,
                bIsLoadedFromLocal: true,
            };
        case Actions.LOAD_AUTH_FROM_LOCAL:
            return {
                ...state,
                bIsLoggedIn: true
            };
        case Actions.UPDATE_USER_PROFILE:
        case Actions.UPLOAD_AVATAR:
            return {
                ...state,
                bIsLoading: true,
                error: ""
            };
        case Actions.UPLOAD_AVATAR_SUCCESS:
            _newState = {...state}
            _newState.sUploadedAvatar = action.payload.item
            _newState.bIsLoading = false;
            return _newState;
        case Actions.UPLOAD_AVATAR_FAIL:
            Toast.show(translate('Upload Avatar Fail!'));
            _newState = {...state}
            _newState.bIsLoading = false;
            return _newState;
        case Actions.UPDATE_USER_PROFILE_SUCCESS:
            Toast.show(translate('Update info successful!'));
            AsyncStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                bIsLoading: false,
                oUser: action.payload
            };
        case Actions.UPDATE_USER_PROFILE_FAIL:
            Toast.show(translate('Could not update info!'));
            return {
                ...state,
                bIsLoading: false,
                error: action.error
            };
        case Actions.GET_POSITION_SUCCESS:
            return {
                ...state,
                position: action.payload.position,
                bIsSetPosition: true,
                isAvailableDistance: true
            };
        case Actions.GET_POSITION_FAIL:
            return {
                ...state,
                bIsSetPosition: true,
                isAvailableDistance: false
            };
        case Actions.REQUEST_RESET_PASSWORD:
            console.log('action reducer:', action.payload);
            return {
                ...state,
                bIsLoading: true,
                error: "",
                resetPasswordEmail: action.payload
            };
        case Actions.REQUEST_RESET_PASSWORD_SUCCESS:
            Toast.show('Mã mật khẩu đặt lại của bạn đã được gửi tới email của bạn');
            return {
                ...state,
                bIsLoading: false
            };
        case Actions.REQUEST_RESET_PASSWORD_FAIL:
            Toast.show('Email không đúng, vui lòng kiểm tra lại');
            return {
                ...state,
                bIsLoading: false,
                // error: action.error
                error: 'Email không đúng, vui lòng kiểm tra lại'
            };
        case Actions.VERIFY_CODE:
            return {
                ...state,
                bIsLoading: true,
                error: ""
            };
        case Actions.VERIFY_CODE_SUCCESS:
            Toast.show('Mật khẩu mới đã được gửi tới email của bạn');
            return {
                ...state,
                bIsLoading: false
            };
        case Actions.VERIFY_CODE_FAIL:
            return {
                ...state,
                bIsLoading: false,
                // error: action.error
                error: 'Mã xác nhận không hợp lệ'
            };
        case Actions.CHANGE_PASSWORD:
            _newState = {...state};
            _newState.changePass.isProcessing = true;
            _newState.changePass.isSuccess = null;
            return _newState;
        case Actions.CHANGE_PASSWORD_SUCCESS:
            Toast.show('Đổi mật khẩu thành công');
            _newState = {...state};
            _newState.changePass.isProcessing = false;
            _newState.changePass.isSuccess = true;
            return _newState;
        case Actions.CHANGE_PASSWORD_FAIL:
            Toast.show(action.error);
            _newState = {...state}
            _newState.changePass.isProcessing = false;
            _newState.changePass.isSuccess = false;
            return _newState;
        default:
            return {
                ...state,
                error: "",
            }
    }
}
