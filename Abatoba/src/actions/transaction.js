export const GET_ORDERS = "GET_ORDERS";

export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";

export const GET_ORDERS_FAIL = "GET_ORDERS_FAIL";

export const ADD_TO_CART = "ADD_TO_CART";

export const CLEAR_CART = "CLEAR_CART";

export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";

export const GET_CART_FROM_LOCAL = "GET_CART_FROM_LOCAL";

export const GET_CART_FROM_LOCAL_SUCCESS = "GET_CART_FROM_LOCAL_SUCCESS";

export const PLACE_ORDER = "PLACE_ORDER";

export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";

export const PLACE_ORDER_FAIL = "PLACE_ORDER_FAIL";

export const VALIDATE_SALE_OFF = "VALIDATE_SALE_OFF";

export const VALIDATE_SALE_OFF_SUCCESS = "VALIDATE_SALE_OFF_SUCCESS";

export const VALIDATE_SALE_OFF_FAIL = "VALIDATE_SALE_OFF_FAIL";

export const CANCEL_ORDER = "CANCEL_ORDER";

export const CANCEL_ORDER_SUCESS = "CANCEL_ORDER_SUCESS";

export const CANCEL_ORDER_FAIL = "CANCEL_ORDER_FAIL";

export const ONLINE_PAYMENT = "ONLINE_PAYMENT";
export const ONLINE_PAYMENT_FAIL = "ONLINE_PAYMENT_FAIL";
export const ONLINE_PAYMENT_SUCCESS = "ONLINE_PAYMENT_SUCCESS";
export const AUTHEN_TRANSACTION = "AUTHEN_TRANSACTION";
export const AUTHEN_TRANSACTION_SUCCESS = "AUTHEN_TRANSACTION_SUCCESS";
export const AUTHEN_TRANSACTION_FAIL = "AUTHEN_TRANSACTION_FAIL";
export const GET_TRANSACTION_DETAIL = "GET_TRANSACTION_DETAIL";
export const GET_TRANSACTION_DETAIL_SUCCESS = "GET_TRANSACTION_DETAIL_SUCCESS";
export const GET_TRANSACTION_DETAIL_FAIL = "GET_TRANSACTION_DETAIL_FAIL";

export const GET_ATM_ACCOUNT = "GET_ATM_ACCOUNT";
export const GET_ATM_ACCOUNT_SUCCESS = "GET_ATM_ACCOUNT_SUCCESS";
export const GET_ATM_ACCOUNT_FAIL = "GET_ATM_ACCOUNT_FAIL";

export const UPDATE_ATM_ACCOUNT = "UPDATE_ATM_ACCOUNT";
export const UPDATE_ATM_ACCOUNT_SUCCESS = "UPDATE_ATM_ACCOUNT_SUCCESS";
export const UPDATE_ATM_ACCOUNT_FAIL = "UPDATE_ATM_ACCOUNT_FAIL";

export const GET_IB_ACCOUNT = "GET_IB_ACCOUNT";
export const GET_IB_ACCOUNT_SUCCESS = "GET_IB_ACCOUNT_SUCCESS";
export const GET_IB_ACCOUNT_FAIL = "GET_IB_ACCOUNT_FAIL";

export const UPDATE_IB_ACCOUNT = "UPDATE_IB_ACCOUNT";
export const UPDATE_IB_ACCOUNT_SUCCESS = "UPDATE_IB_ACCOUNT_SUCCESS";
export const UPDATE_IB_ACCOUNT_FAIL = "UPDATE_IB_ACCOUNT_FAIL";

export function getOrders(payload) {
    return{
        type:GET_ORDERS,
        payload
    }
}

export function addToCart (payload) {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export function removeItemFromCart (payload) {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload
    }
}

export function placeOrder (payload) {
    return {
        type: PLACE_ORDER,
        payload
    }
}

export function getCartFromLocal(payload) {
    return {
        type: GET_CART_FROM_LOCAL,
        payload
    }
}

export function validateSaleOf(payload) {
    return {
        type: VALIDATE_SALE_OFF,
        payload
    }
}
export function cancelOrder(payload) {
    return {
        type: CANCEL_ORDER,
        payload
    }
}
export function onlinePayment(payload) {
    return {
        type: ONLINE_PAYMENT,
        payload
    }
}
export function authenTransaction(payload) {
    return {
        type: AUTHEN_TRANSACTION,
        payload
    }
}
export function getTransactionDetail(payload) {
    return {
        type: GET_TRANSACTION_DETAIL,
        payload
    }
}

export function getAtmAccount (payload) {
    return {
        type: GET_ATM_ACCOUNT,
        payload
    }
}
export function updateAtmAccount (payload) {
    return {
        type: UPDATE_ATM_ACCOUNT,
        payload
    }
}

export function getIbAccount (payload) {
    return {
        type: GET_IB_ACCOUNT,
        payload
    }
}
export function updateIbAccount (payload) {
    return {
        type: UPDATE_IB_ACCOUNT,
        payload
    }
}