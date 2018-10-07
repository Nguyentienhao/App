export const SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE';
export const LOAD_DEFAULT_STATES = 'LOAD_DEFAULT_STATES';

export const setCurrentLanguage = (language) => ({
    type: SET_CURRENT_LANGUAGE,
    payload: {
        language
    }
});
export const loadDefaultStates = () => ({
    type: LOAD_DEFAULT_STATES
});
