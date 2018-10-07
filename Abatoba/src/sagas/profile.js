import {put} from "redux-saga/effects";
import * as Actions from '../actions';
import {apiCall} from "../services/api";

export default ProfileSagas = {
    sendFeedback: function* (action) {
        let message = action.payload.message;
        try {
            let resp = yield apiCall(
                'post',
                'Contact/Feedback', {message: message}
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.SEND_FEED_BACK_SUCCESS,
                        payload: resp.data.message
                    });
                }
                else {
                    yield put({
                        type: Actions.SEND_FEED_BACK_FAIL,
                        payload: {
                            error: resp.data.message
                        }
                    });
                }
            } else {
                yield put({
                    type: Actions.SEND_FEED_BACK_FAIL,
                    payload: {
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            yield put({
                type: Actions.SEND_FEED_BACK_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    sendInviteFriend: function* (action) {
        let email = action.payload.email;
        try {
            let resp = yield apiCall(
                'post',
                'Contact/InviteFriend',
                {
                    email: email,
                    subject: "sample string",
                    message: "sample string"
                }
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.SEND_INVITE_FRIEND_SUCCESS,
                        payload: resp.data.message
                    });
                }
                else {
                    yield put({
                        type: Actions.SEND_INVITE_FRIEND_FAIL,
                        payload: {
                            error: resp.data.message
                        }
                    });
                }
            } else {
                yield put({
                    type: Actions.SEND_INVITE_FRIEND_FAIL,
                    payload: {
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log('error:', error);
            yield put({
                type: Actions.SEND_INVITE_FRIEND_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
};
