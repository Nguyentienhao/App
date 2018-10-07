import _ from 'lodash';
import {AsyncStorage} from "react-native";

import {put, select} from "redux-saga/effects";
import {apiCall, apiFetch} from '../services/api';

import env from "../configs/env";
import * as Actions from '../actions';

export default CategorySagas = {
    getCategories: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                `Category/${action.payload.type}`, typeof action.payload.params !== 'undefined' ? action.payload.params : {}
            );
            var action_type = action.payload.params ? action.payload.params.screen:'';
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        ...action.payload,
                        type: Actions.GET_CATEGORIES_HIERARCHICALLY_SUCCESS,
                        payload: resp.data.data
                    });

                    if (action_type === 'home'){
                        let url = `Article/Get/1/2/${resp.data.data[0].cate_id}`;
                        let artResp = yield apiCall(
                            'get',
                            url,
                        );
                        if (artResp.data) {
                            if (artResp.data.success === true) {
                                yield put({
                                    type: Actions.GET_ARTICLES_SUCCESS,
                                    payload: {
                                        ...action.payload,
                                        items: artResp.data.data
                                    }
                                });
                            }
                            else {
                                yield put({
                                    type: Actions.GET_ARTICLES_FAIL,
                                    payload: {
                                        ...action.payload,
                                        error: artResp.data.error_message
                                    }
                                });
                            }
                        }
                        else {
                            yield put({
                                type: Actions.GET_ARTICLES_FAIL,
                                payload: {
                                    ...action.payload,
                                    error: 'Something went wrong!'
                                }
                            });
                        }
                    }
                }
                else {
                    yield put({
                        type: Actions.GET_CATEGORIES_HIERARCHICALLY_FAIL,
                        error: resp.data.error_message
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_CATEGORIES_HIERARCHICALLY_FAIL,
                    error: 'Something went wrong!'
                });
            }
        }
        catch (error) {
            console.log('error', error);
            yield put({
                type: Actions.GET_CATEGORIES_HIERARCHICALLY_FAIL,
                error: "Something went wrong!"
            });
        }
    }
};
