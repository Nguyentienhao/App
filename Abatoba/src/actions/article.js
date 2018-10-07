export const GET_ARTICLES = "GET_ARTICLES";
export const GET_ARTICLES_SUCCESS = "GET_ARTICLES_SUCCESS";
export const GET_ARTICLES_FAIL = "GET_ARTICLES_FAIL";
export const GET_ARTICLE_DETAIL = "GET_ARTICLE_DETAIL";
export const GET_ARTICLE_DETAIL_SUCCESS = "GET_ARTICLE_DETAIL_SUCCESS";
export const GET_ARTICLE_DETAIL_FAIL = "GET_ARTICLE_DETAIL_FAIL";
export const GET_RELATED_ARTICLES = "GET_RELATED_ARTICLES";
export const GET_RELATED_ARTICLES_SUCCESS = "GET_RELATED_ARTICLES_SUCCESS";
export const GET_RELATED_ARTICLES_FAIL = "GET_RELATED_ARTICLES_FAIL";
export const CLEAR_ARTICLE = "CLEAR_ARTICLE";

export function getArticles(payload) {
    return {
        type: GET_ARTICLES,
        payload
    };
}
export function getArticleDetail(payload) {
    return {
        type: GET_ARTICLE_DETAIL,
        payload
    };
}
export function getRelatedArticles(payload) {
    return {
        type: GET_RELATED_ARTICLES,
        payload
    }
}
export function clearArticle(payload) {
    return {
        type: CLEAR_ARTICLE,
        payload
    }
}