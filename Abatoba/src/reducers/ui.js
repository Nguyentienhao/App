import _ from "lodash";
import {AsyncStorage} from "react-native";
import {setCurrentLanguage, getCurrentLanguage} from "../languages/locale";
import {defaultLanguage} from "../languages";
import {setLocale} from "../services/api";
import {
    SET_CURRENT_LANGUAGE,
} from "../actions/ui";

const defaultState = {
    language: defaultLanguage,
    bIsLoaded: false
};

export default function ui(state = defaultState, action) {
    switch (action.type) {
        case SET_CURRENT_LANGUAGE:
            setCurrentLanguage(action.payload.language);
            setLocale(action.payload.language);
            return {
                ...state,
                language: action.payload.language,
                bIsLoaded: true
            };
        default:
            return state;
    }
}
