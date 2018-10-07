import {AsyncStorage} from "react-native";

import {put} from "redux-saga/effects";
import {apiCall, apiFetch} from '../services/api';
import * as Encoding from "../services/encoding";
import * as Actions from '../actions';

export default AuthSagas = {
    login: function* (action) {
        let payload = {...action.payload};
        let username = payload.username;
        let password = Encoding.Encoding.EncodingVigenere.prototype.Encrypt(payload.password);
        try {
            let resp = yield apiCall(
                'post',
                'Account/LoginApp', {
                    username,
                    password
                }
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    let data = {...resp.data.data, access_token: resp.data.access_token};
                    yield put({
                        type: Actions.LOGIN_SUCCESS,
                        payload: data
                    });
                }
                else {
                    yield put({
                        type: Actions.LOGIN_FAIL,
                        error: resp.data.message
                    });
                }
            }
            else {
                yield put({
                    type: Actions.LOGIN_FAIL,
                    error: 'Something went wrong!'
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.LOGIN_FAIL,
                error: "Something went wrong!"
            });
        }
    },


    logout: function* () {
        try {
            yield AsyncStorage.removeItem("user");
            yield put({type: Actions.LOGOUT_SUCCESS});
        } catch (error) {
            // Error retrieving data
        }
    },
    register: function* (action) {
        let payload = {...action.payload};
        payload.password = Encoding.Encoding.EncodingVigenere.prototype.Encrypt(payload.password);
        payload.password_confirm = payload.password;
        payload.gender = payload.gender === 'Nam' ? 0 : 1;
        try {
            let resp = yield apiCall(
                'post',
                'Account/RegisterLocal',
                payload
            );
            console.log('RegisterLocal', resp);
            if (resp.data) {
                if (resp.data.success === true) {
                    let payload = {...resp.data.data, access_token: resp.data.access_token};
                    yield put({
                        type: Actions.REGISTER_SUCCESS,
                        payload: payload
                    });
                }
                else {
                    yield put({
                        type: Actions.REGISTER_FAIL,
                        error: resp.data.message
                    });
                }
            }
            else {
                yield put({
                    type: Actions.REGISTER_FAIL,
                    error: 'Something went wrong!'
                });
            }
        }
        catch (error) {
            yield put({
                type: Actions.REGISTER_FAIL,
                error: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    },
    loadAuthFromLocal: function* (action) {
        let user = yield AsyncStorage.getItem('user');
        console.log("Load from local");
        yield put({
            type: Actions.SET_AUTH_FROM_LOCAL,
            payload: {
                user: user ? JSON.parse(user) : {}
            }
        });
    },
    updateUserInfo: function* (action) {
        let payload = {...action.payload};
        try {
            let resp = yield apiCall(
                'post',
                'Account/UpdateInfo',
                payload
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.UPDATE_USER_PROFILE_SUCCESS,
                        payload: payload
                    });
                }
                else {
                    yield put({
                        type: Actions.UPDATE_USER_PROFILE_FAIL,
                        error: resp.data.message
                    });
                }
            }
            else {
                yield put({
                    type: Actions.UPDATE_USER_PROFILE_FAIL,
                    error: 'Something went wrong!'
                });
            }
        }
        catch (error) {
            yield put({
                type: Actions.UPDATE_USER_PROFILE_FAIL,
                error: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    },
    uploadAvatar: function* (action) {
        let data = new FormData();

        if (action.payload.uri) {
            data.append('file', {
                uri: action.payload.uri,
                name: action.payload.name,
                type: action.payload.type
            });
        }

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        };

        try {
            let resp = yield apiFetch(
                'File/Upload', config
            );
            resp = yield resp.json();
            console.log('resp data', resp);
            if (resp.data) {
                if (resp.success === true) {
                    yield put({
                        type: Actions.UPLOAD_AVATAR_SUCCESS,
                        payload: {
                            item: resp.data[0]
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.UPLOAD_AVATAR_FAIL,
                        error: resp.data.message
                    });
                }
            }
            else {
                yield put({
                    type: Actions.UPLOAD_AVATAR_FAIL,
                    error: 'Something went wrong!'
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.UPLOAD_AVATAR_FAIL,
                error: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    },
    fetchSupportDetail: function* (action) {
        let url;
        switch (action.payload.name) {
            case 'about':
                url = 'Information/GetAbout';
                break;
            case 'security':
                url = 'Information/GetSecurityTerms';
                break;
            case 'payment':
                url = 'Information/GetPaymentTerms';
                break;
        }
        try {
            let resp = yield apiCall(
                'post',
                url, {}
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_SUPPORT_DETAIL_SUCCESS,
                        payload: resp.data.data.content
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_SUPPORT_DETAIL_FAIL,
                        error: resp.data.message
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_SUPPORT_DETAIL_FAIL,
                    error: 'Something went wrong!'
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.GET_SUPPORT_DETAIL_FAIL,
                error: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    },
    requestResetPassword: function* (action) {
        let email = action.payload;
        try {
            let resp = yield apiCall(
                'post',
                'CodeStore/Get', {
                    email
                }
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.REQUEST_RESET_PASSWORD_SUCCESS
                    });
                } else {
                    yield put({
                        type: Actions.REQUEST_RESET_PASSWORD_FAIL,
                        error: resp.data.message
                    });
                }
            } else {
                yield put({
                    type: Actions.REQUEST_RESET_PASSWORD_FAIL,
                    error: 'Something went wrong!'
                });
            }
        } catch (error) {
            console.log(error);
            yield put({
                type: Actions.REQUEST_RESET_PASSWORD_FAIL,
                error: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    },
    verifyCode: function* (action) {
        let email = action.payload.email;
        let code = action.payload.code;
        try {
            let resp = yield apiCall(
                'post',
                'CodeStore/Verify', {
                    email,
                    code
                }
            );
            if (resp.data) {
                if (resp.data.success) {
                    yield put({
                        type: Actions.VERIFY_CODE_SUCCESS
                    });
                } else {
                    yield put({
                        type: Actions.VERIFY_CODE_FAIL,
                        error: resp.data.message
                    });
                }
            } else {
                yield put({
                    type: Actions.VERIFY_CODE_FAIL,
                    error: 'Something went wrong!'
                });
            }
        } catch (error) {
            console.log(error);
            yield put({
                type: Actions.VERIFY_CODE_FAIL,
                error: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    },
    changePassword: function* (action) {
        let {password, old_password} = action.payload
        password = Encoding.Encoding.EncodingVigenere.prototype.Encrypt(password);
        old_password = Encoding.Encoding.EncodingVigenere.prototype.Encrypt(old_password);
        try {
            let resp = yield apiCall(
                'post',
                'Account/ChangePassword', {
                    password, old_password, password_confirm: password
                }
            );
            console.log(resp.data);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.CHANGE_PASSWORD_SUCCESS
                    });
                } else {
                    yield put({
                        type: Actions.CHANGE_PASSWORD_FAIL,
                        error: resp.data.message || resp.data.Message
                    });
                }
            } else {

                yield put({
                    type: Actions.CHANGE_PASSWORD_FAIL,
                    error: resp.Message || 'Something went wrong!'
                });
            }
        } catch (error) {
            console.log(error);
            yield put({
                type: Actions.CHANGE_PASSWORD_FAIL,
                error: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    },
};
