import * as Actions from "../actions";

import {AsyncStorage} from "react-native";

const defaultState = {
    productCategories: [],
    homeProductCategories: [],
    articlesCategories: [],
    isFetching: false,
    error: "",
};


function assignCategoryLevelsRecursively(items, level) {
    return items.map(item => {
        item.level = level;
        //if (typeof item.cate_childs !== 'undefined') {
        if (!!item.cate_childs) {
            assignCategoryLevelsRecursively(item.cate_childs, level + 1);
        }
        return item;
    });
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case Actions.GET_CATEGORIES_HIERARCHICALLY:
            return {
                ...state,
                isFetching: true
            };
        case Actions.GET_CATEGORIES_HIERARCHICALLY_SUCCESS:
            _newState = {...state};
            let aCategories = action.payload
            aCategories = assignCategoryLevelsRecursively(aCategories, 1);
            if (typeof action.params !== 'undefined' && typeof action.params.type !== 'undefined') {
                switch (action.params.type) {
                    case 'homeProCate':
                        _newState.homeProductCategories = aCategories;
                        break;
                    case 'articlesCategories': 
                        _newState.articlesCategories = aCategories;
                        break;
                    default:
                        _newState.productCategories = aCategories;
                        break;

                }
            } else {
                _newState.productCategories = aCategories
            }
            _newState.isFetching = false
            return _newState;
        default:
            return {
                ...state,
                error: "",
            }
    }
}
