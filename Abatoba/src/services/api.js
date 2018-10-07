import {AsyncStorage} from "react-native";
import env from "../configs/env";
import {doLogout} from "../actions/auth";
import {call, put} from "redux-saga/effects";
import axios from "axios";
import {JUMP_TO} from "../actions";
import Toast from "react-native-simple-toast";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-native"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-native"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactNative);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _reactNative) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setToken = setToken;
    exports.getToken = getToken;
    exports.apiCall = apiCall;
    exports.apiFetch = apiFetch;
    exports.setAuthParams = setAuthParams;
    exports.getAuth = getAuth;
    exports.setLocale = setLocale;


    let _react2 = _interopRequireDefault(_react);
    let _token = "";
    let _user_id = 0;
    let _auth = null;
    let _locale = 'vi';

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule
            ? obj
            : {
                default: obj
            };
    }

    function setToken(token) {
        _token = token;
    }

    function setLocale(locale) {
        _locale = locale;
    }

    function setAuthParams(authParams) {
        _auth = authParams;

        if (authParams.hasOwnProperty("access_token")) {
            _token = authParams.access_token;
        }
        if (authParams.hasOwnProperty("user_id")) {
            _user_id = authParams.user_id;
        }
    }

    function getToken() {
        return _token;
    }

    function getAuth() {
        return _auth;
    }

    function encodeQueryData(data) {
        let ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    function* apiCall(method, url, params = {}) {
        let headers = {};
        headers['Content-Type'] = 'application/json';
        if (_token) {
            headers.Authorization = 'Bearer ' + _token;
        }
        params.locale = _locale;
        let resp = false;
        let logOut = false;
        try {
            if (method === 'get') {
                resp = yield axios.get(`${env.site_url}api/${url}?` + encodeQueryData(params), {headers});
            } else {
                resp = yield axios.post(`${env.site_url}api/${url}`, params, {headers});
            }

            console.log('-------------');
            console.log('api:', url);
            console.log('header:', headers);
            console.log('params', params);
            console.log('response: ', resp);
            console.log('-------------');

        }
        catch (e) {
            console.log(e.response);
            resp = e.response;
            switch (e.response.data.state) {
                case 401:
                    if (e.response.data.redirect === 'logout') {
                        Toast.show(e.response && e.response.data ? e.response.data.error_message : "Something went wrong!");
                        yield put(doLogout());
                        logOut = true;
                    }
                    break;
            }
        }
        if (logOut) {
            return false;
        }
        return resp;

    }

    function* apiFetch(url, config) {
        // if (_token) {
        //     config.body.append('token', _token);
        // }
        // if (_user_id) {
        //     config.body.append('id', _user_id);
        // }
        if (_token) {
            config.headers.Authorization = 'Bearer ' + _token;
        }
        console.log('upload url', `${env.site_url}api/${url}`);

        return yield fetch(`${env.site_url}api/${url}`, config);
    }

});
