import _ from 'lodash';
import {AsyncStorage} from "react-native";

import {put, select} from "redux-saga/effects";
import {apiCall, apiFetch} from '../services/api';

import env from "../configs/env";
import * as Actions from '../actions';

export default ProductSagas = {
    getProducts: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                `Product/${action.payload.type}`, typeof action.payload.params !== 'undefined' ? action.payload.params : {}
            );
            console.log(resp);
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_PRODUCTS_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_PRODUCTS_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_PRODUCTS_FAIL,
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
                type: Actions.GET_PRODUCTS_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getProductDetail: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                `Product/GetDetail/${action.payload.id}`
            );
            console.log('getProductDetail', resp.data);
            if (resp.data) {
                if (resp.data.success === true && resp.data.data) {
                    yield put({
                        type: Actions.GET_PRODUCT_DETAIL_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_PRODUCT_DETAIL_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message ? resp.data.message:'Không có sản phẩm'
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_PRODUCT_DETAIL_FAIL,
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
                type: Actions.GET_PRODUCT_DETAIL_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getSliders: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                `Slideshow/Get`
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_SLIDERS_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_SLIDERS_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_SLIDERS_FAIL,
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
                type: Actions.GET_PRODUCT_DETAIL_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    search: function* (action) {
        try {
            console.log('keyword', encodeURI(action.payload.keywords))
            let resp = yield apiCall(
                'get',
                `Product/GetSearch/${action.payload.page}/${action.payload.limit}/` + encodeURI(action.payload.keywords)
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.SEARCH_SUCCESS,
                        payload: {
                            params : action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.SEARCH_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.SEARCH_FAIL,
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
                type: Actions.SEARCH_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
}