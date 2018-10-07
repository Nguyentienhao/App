import * as Actions from "../actions";
import Toast from "react-native-simple-toast";

const defaultState = {
    isSending: false,
    isSuccess: false
};

export default function (state = defaultState, action) {
    switch (action.type) {
        // send feedback
        case Actions.SEND_FEED_BACK:
            return {
                ...state,
                isSending: true,
                isSuccess: false
            };
        case Actions.SEND_FEED_BACK_SUCCESS:
            Toast.show(action.payload);
            return {
                ...state,
                isSending: false,
                isSuccess: true
            };
        case Actions.SEND_FEED_BACK_FAIL:
            Toast.show(action.payload.error);
            return {
                ...state,
                isSending: false,
                isSuccess: false
            };
        // send invite friend
        case Actions.SEND_INVITE_FRIEND:
            return {
                ...state,
                isSending: true,
                isSuccess: false
            };
        case Actions.SEND_INVITE_FRIEND_SUCCESS:
            Toast.show(action.payload);
            return {
                ...state,
                isSending: false,
                isSuccess: true
            };
        case Actions.SEND_INVITE_FRIEND_FAIL:
            Toast.show(action.payload.error);
            return {
                ...state,
                isSending: false,
                isSuccess: false
            };
        default:
            return {
                ...state,
                isSending: false,
                isSuccess: false
            };
    }
}
