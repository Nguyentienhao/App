export const LOGIN = "LOGIN";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT = "LOGOUT";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const REGISTER = "REGISTER";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const REGISTER_FAIL = "REGISTER_FAIL";

export const SET_AUTH_FROM_LOCAL = 'SET_AUTH_FROM_LOCAL';

export const LOAD_AUTH_FROM_LOCAL = 'LOAD_AUTH_FROM_LOCAL';

export const GET_POSITION_SUCCESS = 'GET_POSITION_SUCCESS';

export const GET_POSITION_FAIL = 'GET_POSITION_FAIL';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';

export const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';

export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';

export const REQUEST_RESET_PASSWORD_SUCCESS = 'REQUEST_RESET_PASSWORD_SUCCESS';

export const REQUEST_RESET_PASSWORD_FAIL = 'REQUEST_RESET_PASSWORD_FAIL';

export const VERIFY_CODE = 'VERIFY_CODE';

export const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS';

export const VERIFY_CODE_FAIL = 'VERIFY_CODE_FAIL';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';

export const UPLOAD_AVATAR_FAIL = 'UPLOAD_AVATAR_FAIL';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

export function doLogin(username, password) {
    return {
        type: LOGIN,
        payload: {
            username: username,
            password: password
        }
    };
}

export function doLogout() {
    return {
        type: LOGOUT
    }
}

export function doRegister(payload) {
    return {
        type: REGISTER,
        payload
    };
}

export function doUploadAvatar(payload) {
    return {
        type: UPLOAD_AVATAR,
        payload
    }
}

export function setPosition(payload) {
    return {
        type: GET_POSITION_SUCCESS,
        payload
    }
}

export function updateUserProfile(payload) {
    return {
        type: UPDATE_USER_PROFILE,
        payload
    }
}

export function doRequestResetPassword(payload) {
    return {
        type: REQUEST_RESET_PASSWORD,
        payload
    }
}

export function doVerifyCode(payload) {
    return {
        type: VERIFY_CODE,
        payload
    }
}

export function doChangePassword(payload) {
    return {
        type: CHANGE_PASSWORD,
        payload
    }
}