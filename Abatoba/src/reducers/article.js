import * as Actions from "../actions";
import Toast from "react-native-simple-toast";

const defaultState = {
    articleDetail: {
        item: [],
        items: [],
        isFetching: false,
    },
    isFetchingDetail: false,
    articlesListing: [],
    articlesListingByCate: [],
    isFetchingArticlesListing: false,
    relatedArticles: [],
    isFetchingRelatedArticles: false,
};

var article = (state = defaultState, action) => {
    switch (action.type) {
        case Actions.GET_ARTICLES:
            _newState = {...state};
            _newState.isFetchingArticlesListing = true;
            return _newState;
        case Actions.GET_ARTICLES_SUCCESS:
            _newState = {...state};
            _newState.isFetchingArticlesListing = false;
            if (typeof action.payload.isListing !== 'undefined' && action.payload.isListing == true) {
                _newState.articlesListingByCate = action.payload.items;
            } else {
                _newState.articlesListing = action.payload.items;
            }
            _newState.error = action.error;
            return _newState;

        case Actions.GET_ARTICLE_DETAIL:
            _newState = {...state};
            _newState.articleDetail.isFetching = true;
            return _newState;
        case Actions.GET_ARTICLE_DETAIL_SUCCESS:
            _newState = {...state};
            let article = action.payload.items;
            _newState.articleDetail.isFetching = false;
            _newState.articleDetail.items.push(article);
            _newState.error = '';
            return _newState;
        case Actions.GET_ARTICLE_DETAIL_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state}
            _newState.articleDetail.isFetching = false;
            _newState.error = action.payload.error;
            return _newState;
        case Actions.CLEAR_ARTICLE:
            _newState = {...state};
            _newState.articleDetail.items.pop()
            return _newState;
        case Actions.GET_RELATED_ARTICLES:
            _newState = {...state};
            _newState.isFetchingRelatedArticles = true;
            return _newState;
        case Actions.GET_RELATED_ARTICLES_SUCCESS:
            _newState = {...state};
            _newState.isFetchingRelatedArticles = false;
            _newState.relatedArticles = action.payload.items;
            _newState.error = action.error;
            return _newState;
        default:
            return {...state};
    }
}

export default article;