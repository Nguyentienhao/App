import {languages, defaultLanguage} from './index';
import {AsyncStorage} from "react-native";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-native'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-native'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactNative);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _reactNative) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Translate = undefined;
    exports.setLocalization = setLocalization;
    exports.translate = translate;
    exports.setCurrentLanguage = setCurrentLanguage;
    exports.getCurrentLanguage = getCurrentLanguage;

    var _react2 = _interopRequireDefault(_react);
    var currentLanguage = defaultLanguage;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _localization = languages[currentLanguage];

    function setLocalization(localization) {
        _localization = localization;
    }

    function setCurrentLanguage(language) {
        currentLanguage = language;
        AsyncStorage.setItem('uiLanguage', language);
        setLocalization(languages[language]);
    }

    function translate(value) {
        if (_localization.hasOwnProperty(value)) {
            return _localization[value];
        }
        return value;
    }

    function getCurrentLanguage() {
        return currentLanguage;
    }

    var Translate = exports.Translate = function Translate(_ref) {
        var value = _ref.value;
        return _react2.default.createElement(
            _reactNative.Text,
            null,
            translate(value)
        );
    };
});
