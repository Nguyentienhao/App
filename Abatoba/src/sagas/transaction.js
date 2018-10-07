import _ from 'lodash';
import {AsyncStorage} from "react-native";

import {put, select} from "redux-saga/effects";
import {apiCall, apiFetch} from '../services/api';

import env from "../configs/env";
import * as Actions from '../actions';

export default TransactionSaga = {
    getOrders: function* (action) {
        try {
            let resp = yield apiCall(
                'post',
                'Order/GetOrders', action.payload.params
            );
            console.log(resp);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_ORDERS_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_ORDERS_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.error_message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_ORDERS_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.GET_ORDERS_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getCartFromLocal: function* (action){
        let currCart = yield AsyncStorage.getItem('currCart');
        yield put({
            type: Actions.GET_CART_FROM_LOCAL_SUCCESS,
            payload: {
                currCart: currCart ? JSON.parse(currCart) : []
            }
        });
    },
    placeOrder: function* (action) {
        let params = action.payload.params;

        console.log('params', params);

        try {
            let resp = yield apiCall(
                'post',
                'Order/PlaceOrder', params
            );
            console.log('placeOrder', resp.data);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.PLACE_ORDER_SUCCESS,
                        payload: {
                            ...action.payload,
                            data: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.PLACE_ORDER_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.PLACE_ORDER_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.PLACE_ORDER_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    validateSaleOff: function* (action) {
        let params = action.payload.params;
        try {
            let resp = yield apiCall(
                'get',
                `SaleOff/ValidateSaleOff/${action.payload.id}`, params
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.VALIDATE_SALE_OFF_SUCCESS,
                        payload: {
                            ...action.payload,
                            data: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.VALIDATE_SALE_OFF_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.VALIDATE_SALE_OFF_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.VALIDATE_SALE_OFF_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    cancelOrder: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                `Order/CancelBill/${action.payload.id}`, {}
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.CANCEL_ORDER_SUCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.CANCEL_ORDER_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.CANCEL_ORDER_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.CANCEL_ORDER_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    onlinePayment: function* (action) {
        let params = action.payload.params;

        console.log('onlinePayment', params);

        try {
            let resp = yield apiCall(
                'post',
                `Order/OnlinePayment?auth_site=${params.auth_site}`, params
            );
            console.log('onlinePayment', resp.data);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.ONLINE_PAYMENT_SUCCESS,
                        payload: {
                            ...action.payload,
                            data: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.ONLINE_PAYMENT_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.ONLINE_PAYMENT_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.ONLINE_PAYMENT_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    authenTransaction: function* (action) {
        let params = action.payload.params;

        console.log('authenTransaction', params);

        try {
            let resp = yield apiCall(
                'post',
                'Order/AuthenTransaction', params
            );
            console.log('authenTransaction', resp.data);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.AUTHEN_TRANSACTION_SUCCESS,
                        payload: {
                            ...action.payload,
                            data: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.AUTHEN_TRANSACTION_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.AUTHEN_TRANSACTION_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.AUTHEN_TRANSACTION_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getTransactionDetail: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                'Order/GetTransactionDetail', action.payload.params
            );
            console.log(resp);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_TRANSACTION_DETAIL_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_TRANSACTION_DETAIL_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_TRANSACTION_DETAIL_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.GET_TRANSACTION_DETAIL_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getAtmAccount: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                'Account/GetATMCardInfo', action.payload.params
            );
            console.log('GetATMCardInfo', resp);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_ATM_ACCOUNT_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_ATM_ACCOUNT_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_ATM_ACCOUNT_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.GET_ATM_ACCOUNT_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getIbAccount: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                'Account/GetIBBankInfo', action.payload.params
            );
            console.log('GetIBBankInfo', resp);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_IB_ACCOUNT_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_IB_ACCOUNT_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_IB_ACCOUNT_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.GET_IB_ACCOUNT_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    updateAtmAccount: function* (action) {
        let params = action.payload.params;

        console.log('UpdateATMCardInfo params', params);

        try {
            let resp = yield apiCall(
                'post',
                'Account/UpdateATMCardInfo', params
            );
            console.log('UpdateATMCardInfo', resp.data);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.UPDATE_ATM_ACCOUNT_SUCCESS,
                        payload: {
                            ...action.payload,
                            data: resp.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.UPDATE_ATM_ACCOUNT_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.UPDATE_ATM_ACCOUNT_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.UPDATE_ATM_ACCOUNT_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    updateIbAccount: function* (action) {
        let params = action.payload.params;

        console.log('UpdateIBBankInfo params', params);

        try {
            let resp = yield apiCall(
                'post',
                'Account/UpdateIBBankInfo', params
            );
            console.log('UpdateIBBankInfo', resp.data);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.UPDATE_IB_ACCOUNT_SUCCESS,
                        payload: {
                            ...action.payload,
                            data: resp.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.UPDATE_IB_ACCOUNT_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.UPDATE_IB_ACCOUNT_FAIL,
                    payload: {
                        ...action.payload,
                        error: 'Something went wrong!'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.UPDATE_IB_ACCOUNT_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
}