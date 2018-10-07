export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const GET_PRODUCT_DETAIL_SUCCESS = "GET_PRODUCT_DETAIL_SUCCESS";
export const GET_PRODUCT_DETAIL_FAIL = "GET_PRODUCT_DETAIL_FAIL";

export const GET_SLIDERS = "GET_SLIDERS";
export const GET_SLIDERS_SUCCESS = "GET_SLIDERS_SUCCESS";
export const GET_SLIDERS_FAIL = "GET_SLIDERS_FAIL";

export const SEARCH = "SEARCH";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAIL = "SEARCH_FAIL";

export const CLEAR_PRODUCT = "CLEAR_PRODUCT";
export const CLEAR_SEARCH_KEYWORDS = "CLEAR_SEARCH_KEYWORDS";
export const CLEAR_SEARCH_ALL_PRODUCT = "CLEAR_SEARCH_ALL_PRODUCT";
export const CLEAR_CATEGORY_PRODUCT = "CLEAR_CATEGORY_PRODUCT";

export function getProducts(payload) {
    return {
        type: GET_PRODUCTS,
        payload
    }
}

export function getProductDetail(payload) {
    return {
        type: GET_PRODUCT_DETAIL,
        payload
    }
}
export function getSliders(payload) {
    return {
        type: GET_SLIDERS,
        payload
    }
}

export function doSearch(payload) {
    return {
        type: SEARCH,
        payload
    }
}
export function clearProduct(payload) {
    return {
        type: CLEAR_PRODUCT,
        payload
    }
}
export function clearCategoryProduct(payload) {
    return {
        type: CLEAR_CATEGORY_PRODUCT,
        payload
    }
}

export function clearSearchAllProduct(payload) {
    return {
        type: CLEAR_SEARCH_ALL_PRODUCT,
        payload
    }
}
export function clearSearchKeywords(payload) {
    return {
        type: CLEAR_SEARCH_KEYWORDS,
        payload
    }
}