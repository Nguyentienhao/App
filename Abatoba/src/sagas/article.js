import _ from 'lodash';
import {AsyncStorage} from "react-native";

import {put, select} from "redux-saga/effects";
import {apiCall, apiFetch} from '../services/api';

import env from "../configs/env";
import * as Actions from '../actions';

export default ArticleSaga = {
    getArticles: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                `Article/Get/1/20/${action.payload.cate_id}`
            );
            console.log('getArticles', action)
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_ARTICLES_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_ARTICLES_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.error_message
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
        catch (error) {
            console.log(error);
            yield put({
                type: Actions.GET_ARTICLES_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getArticleDetail: function* (action) {
        try {
            let resp = yield apiCall(
                'get',
                `Article/GetDetail/${action.payload.id}`
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_ARTICLE_DETAIL_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_ARTICLE_DETAIL_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.error_message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_ARTICLE_DETAIL_FAIL,
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
                type: Actions.GET_ARTICLE_DETAIL_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    },
    getRelatedArticles: function* (action) {
        try {
            let resp = yield apiCall(
                'post',
                `Article/GetRelated/1/5/${action.payload.art_id}`
            );
            if (resp.data) {
                if (resp.data.success === true) {
                    yield put({
                        type: Actions.GET_RELATED_ARTICLES_SUCCESS,
                        payload: {
                            ...action.payload,
                            items: resp.data.data
                        }
                    });
                }
                else {
                    yield put({
                        type: Actions.GET_RELATED_ARTICLES_FAIL,
                        payload: {
                            ...action.payload,
                            error: resp.data.error_message
                        }
                    });
                }
            }
            else {
                yield put({
                    type: Actions.GET_RELATED_ARTICLES_FAIL,
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
                type: Actions.GET_RELATED_ARTICLES_FAIL,
                payload: {
                    ...action.payload,
                    error: "Something went wrong!"
                }
            });
        }
    }
}