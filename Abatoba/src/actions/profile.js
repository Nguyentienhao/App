export const SEND_FEED_BACK = "SEND_FEED_BACK";
export const SEND_FEED_BACK_FAIL = "SEND_FEED_BACK_FAIL";
export const SEND_FEED_BACK_SUCCESS = "SEND_FEED_BACK_SUCCESS";
export const SEND_INVITE_FRIEND = "SEND_INVITE_FRIEND";
export const SEND_INVITE_FRIEND_SUCCESS = "SEND_INVITE_FRIEND_SUCCESS";
export const SEND_INVITE_FRIEND_FAIL = "SEND_INVITE_FRIEND_FAIL";

export function sendFeedback (payload) {
    return {
        type: SEND_FEED_BACK,
        payload
    }
}

export function sendInviteFriend (payload) {
    return {
        type: SEND_INVITE_FRIEND,
        payload
    }
}
