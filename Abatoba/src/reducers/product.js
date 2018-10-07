import * as Actions from "../actions";
import Toast from "react-native-simple-toast";
import getImagePath from "../services/getImagePath";
import _ from 'lodash';

const defaultState = {
    homeRecent: {
        items: [],
        params: {
            page: 0
        },
        isFetching: false,
        isEnd: false,
        type: ''
    },
    homeAllRecent: {
        items: [],
        params: {
            page: 0
        },
        isFetching: false,
        isEnd: false,
        type: ''
    },
    homeAllBestSelling: {
        items: [],
        params: {
            page: 0
        },
        isFetching: false,
        isEnd: false,
        type: ''
    },
    homeBestSelling: {
        items: [],
        params: {
            page: 0
        },
        isFetching: false,
        isEnd: false,
        type: ''
    },
    homeRelated: {
        items: [],
        isFetching: false,
    },
    productDetail: {
        item: [],
        items: [],
        isFetching: false,
    },
    productRelatedDetail: {
        item: [],
        items: [],
        isFetching: false,
    },
    isFetchingDetail: false,
    all_lstProduct: [],
    lstProduct: {
        items:[],
        params:{
            page:1
        },
        isFetching:false,
        isEnd:false
    },
    lstSearchProduct: {
        items:[],
        params:{
            page:0,
            keywords: ''
        },
        isFetching:false,
        isEnd:false
    },
    homeSliders: {
        sliders: [],
        isFetching: false
    },
    error:'',
};

const product = (state = defaultState, action) => {
    switch (action.type) {
        case Actions.GET_PRODUCT_DETAIL:
            _newState = {...state}
            _type = typeof action.payload.type !== 'undefined' ? action.payload.type : 'Detail'
            _newState[`product${_type}`].isFetching = true;
            return  _newState;
        case Actions.GET_PRODUCT_DETAIL_SUCCESS:
            _newState = {...state}
            _type = typeof action.payload.type !== 'undefined' ? action.payload.type : 'Detail'
            let aProduct = action.payload.items
            if (aProduct.pro_colors.length) {
                aProduct.pro_colors = aProduct.pro_colors.map(image => {
                    image.sli_image =  getImagePath(image.procol_image)
                    return image
                });
            }
            _newState[`product${_type}`].item = aProduct;
            _newState[`product${_type}`].items.push(aProduct);
            _newState[`product${_type}`].isFetching = false;
            _newState.isExistProduct=true;
            return _newState;
        case Actions.GET_PRODUCT_DETAIL_FAIL:
            _newState = {...state};
            _type = typeof action.payload.type !== 'undefined' ? action.payload.type : 'Detail'
            _newState[`product${_type}`].isFetching = false;
            _newState.isExistProduct=false;
            return  _newState;

        case Actions.GET_PRODUCTS_SUCCESS:
            let aProducts = action.payload.items
            _newState = {...state};
            if (typeof action.payload.params.type != 'undefined') {
                _list = 'home' + action.payload.params.type;
                _page = _newState[_list].params ? _newState[_list].params.page : 0;
                console.log('GET_PRODUCTS_SUCCESS', _list, action.payload.params)
                if (action.payload.params.page > _page) {
                    _newState[_list].items = [..._newState[_list].items, ...aProducts];
                } else if (action.payload.params.page === 1) {
                    _newState[_list].items = aProducts;
                }
                if (!aProducts.length) {
                    _newState[_list].isEnd = true;
                }
                _newState[_list].params = {..._newState[_list].params, ...action.payload.params};
                _newState[_list].isFetching = false;
                return _newState;
            } else {
                if (_newState.all_lstProduct.length) {
                    _lastList = _newState.all_lstProduct.slice(-1)[0];
                    _newState.all_lstProduct.pop();
                } else {
                    _lastList = {
                        items:[],
                        params:{
                            page:1
                        },
                        isFetching:false,
                        isEnd:false
                    };
                }
                if (action.payload.params.page > _lastList.params.page) {
                    _lastList.items = [..._lastList.items, ...aProducts];
                } else {
                    _lastList.items = aProducts;
                }
                if (!aProducts.length) {
                    _lastList.isEnd = true;
                }
                _lastList.isFetching = false;
                _newState.all_lstProduct.push(_lastList);
                return _newState;
            }
        case Actions.GET_PRODUCTS:
            _newState = {...state};
            if (typeof action.payload.params.type !== 'undefined') {
                _newState['home' + action.payload.params.type].isFetching = true;
            } else {
                if (_newState.all_lstProduct.length && action.payload.params.page > 1) {
                    _lastList = _newState.all_lstProduct.slice(-1)[0];
                    _newState.all_lstProduct.pop();
                } else {
                    _lastList = {
                        items:[],
                        params:{
                            page:1
                        },
                        isFetching:false,
                        isEnd:false
                    };
                }
                _newState.all_lstProduct.push(_lastList);
                _lastList.isFetching = true;
            }
            _newState.error="";
            return _newState;
        case Actions.GET_PRODUCTS_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state};
            if (typeof action.payload.params.type != 'undefined') {
                _newState['home' + action.payload.params.type].isFetching = false;
            } else {
                if (_newState.all_lstProduct.length) {
                    _lastList = _newState.all_lstProduct.slice(-1)[0];
                    _newState.all_lstProduct.pop();
                } else {
                    _lastList = {
                        items:[],
                        params:{
                            page:1
                        },
                        isFetching:false,
                        isEnd:false
                    };
                }
                _lastList.isFetching = false;
                _newState.all_lstProduct.push(_lastList);
                return _newState;
            }
            return _newState;
        case Actions.CLEAR_CATEGORY_PRODUCT:
            _newState = {...state};
            _newState.all_lstProduct.pop()
            return _newState;
        case Actions.GET_SLIDERS:
            _newState = {...state};
            _newState.homeSliders.isFetching=true;
            _newState.error="";
            return _newState;
        case Actions.GET_SLIDERS_SUCCESS:
            _newState = {...state};
            let aSliders = action.payload.items
            if (aSliders.length) {
                aSliders = aSliders.map(slider => {
                    slider.sli_image =  getImagePath(slider.sli_image)
                    return slider
                });
            }
            _newState.homeSliders.sliders= aSliders;
            _newState.homeSliders.isFetching=false;
            _newState.error="";
            return _newState;
        case Actions.SEARCH:
            _newState = {...state};
            _newState.lstSearchProduct.isFetching=true;
            if(action.payload.keywords !== _newState.lstSearchProduct.params.keywords){
                _newState.lstSearchProduct.items=[];
                _newState.lstSearchProduct.isEnd=false;
            }
            _newState.lstSearchProduct.params.keywords = action.payload.keywords;
            return _newState;
        case Actions.SEARCH_SUCCESS:
            _newState = {...state};
            _newState.lstSearchProduct.params = action.payload.params;
            if(action.payload.params.page === 1)
            _newState.lstSearchProduct.items=action.payload.items;
            else
                _newState.lstSearchProduct.items = [..._newState.lstSearchProduct.items,...action.payload.items];
            if(action.payload.items.length < action.payload.params.limit) _newState.lstSearchProduct.isEnd = true;
            _newState.lstSearchProduct.isFetching=false;
            return _newState;
        case Actions.SEARCH_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state};
            _newState.lstSearchProduct.isFetching=false;
            _newState.error = action.payload.error;
            return _newState;
        case Actions.CLEAR_PRODUCT:
            _newState = {...state};
            _newState.productDetail.items.pop()
            return _newState;
        case Actions.CLEAR_SEARCH_ALL_PRODUCT:
            _newState = {...state};
            _newState['homeAll' + action.payload.params.type] = {
                items: [],
                params: {
                    page: 0
                },
                isFetching: false,
                isEnd: false,
                type: ''
            }
            return _newState;
        case Actions.CLEAR_SEARCH_KEYWORDS:
            _newState = {...state};
            _newState.lstSearchProduct = {
                items: [],
                params:{
                    page:0,
                    keywords: ''
                },
                isFetching:false,
                isEnd:false
            };
            return _newState;
        default:
            return {...state};
    }
}

export default product;