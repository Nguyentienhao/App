import _ from 'lodash';
import {AsyncStorage} from "react-native";

import {put, select} from "redux-saga/effects";
import env from "../configs/env";
import * as Actions from '../actions';

export default CategorySagas = {
    loadDefaultStates: function* () {
        try {
            // Language
            let uiLanguage = yield AsyncStorage.getItem("uiLanguage");
            if (uiLanguage === null) {
                uiLanguage = "vi";
            }
            yield put({type: Actions.SET_CURRENT_LANGUAGE, payload: {language: uiLanguage}});
        } catch (error) {
            // Error retrieving data
        }

    }
};
