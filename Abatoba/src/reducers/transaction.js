import * as Actions from "../actions";
import getImagePath from "../services/getImagePath";
import Toast from "react-native-simple-toast";
import {AsyncStorage} from "react-native";
import _ from "lodash";

const defaultState = {
    
    currCart: [],
    successOrder: {},
    paymentType: null,
    isPlacingOrder: false,
    isValidateSaleOff: false,
    isValidSaleOffId: null,
    saleOffInfo: {},
    ordersList1: {
        data: [],
        params: {
            page: 1
        },
        isFetching: false,
        isEnd: false
    },
    ordersList2: {
        data: [],
        params: {
            page: 1
        },
        isFetching: false,
        isEnd: false
    },
    ordersList3: {
        data: [],
        params: {
            page: 1
        },
        isFetching: false,
        isEnd: false
    },
    isCancellingOrder: false,
    bCancelSuccess: null,
    bankList: [
        {key: 'AGB', label: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn (Agribank)'},
        {key: 'BAB', label: 'Ngân hàng TMCP Bắc Á (Bac A Bank)'},
        {key: 'BIDV', label: 'Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)'},
        {key: 'EXB', label: 'Ngân hàng TMCP Xuất Nhập Khẩu (Eximbank)'},
        {key: 'MSB', label: 'Ngân hàng TMCP Hàng Hải (MaritimeBank)'},
        {key: 'STB', label: 'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)'},
        {key: 'SGB', label: 'Ngân hàng Sài Gòn Công Thương (Saigon Bank)'},
        {key: 'NCB', label: 'Ngân Hàng Quốc Dân'},
        {key: 'PGB', label: 'Ngân Hàng TMCP Xăng Dầu Petrolime (PGBank)'},
        {key: 'GPB', label: 'Ngân Hàng Dầu Khí Toàn Cầu (GPBank)'},
        {key: 'ICB', label: 'Ngân hàng TMCP Công Thương (VietinBank)'},
        {key: 'TCB', label: 'Ngân hàng TMCP Kỹ Thương (Techcombank)'},
        {key: 'TPB', label: 'Ngân hàng TMCP Tiên Phong (TienPhongBank)'},
        {key: 'VAB', label: 'Ngân hàng TMCP Việt Á (VietA Bank)'},
        {key: 'VIB', label: 'Ngân hàng TMCP Quốc tế (VIB)'},
        {key: 'VCB', label: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)'},
    ],
    nlBank: ['AGB', 'BAB', 'BIDV', 'EXB', 'MSB', 'STB', 'SGB', 'NCB', 'PGB', 'GPB'],
    onlinePayment: {
        isProcess: false,
        isDone: null,
        data: {}
    },
    authTransaction: {
        isProcess: false,
        isSuccess: null,
        data: {}
    },
    transactionDetail: {
        isFetching: false,
        data: {}
    },
    atmCardInfo: {
        isFetching: false,
        data: {}
    },
    ibCardInfo: {
        isFetching: false,
        data: {}
    },
    isUpdateAtmAccount: false,
    isUpdateIbAccount: false,
};

const transaction = (state = defaultState, action) => {
    switch (action.type) {
        case Actions.GET_CART_FROM_LOCAL:
            return {
                ...state,
                bIsLoading: true,
                error: ""
            };
        case Actions.GET_CART_FROM_LOCAL_SUCCESS:
            return {
                ...state,
                bIsLoading: false,
                currCart: action.payload.currCart
            };
        case Actions.ADD_TO_CART:
            _newState = {...state};
            _attr_now = `${action.payload.product.pro_id}_${action.payload.color}_${action.payload.size}`;
            if (_.isEmpty(_newState.currCart[_attr_now])) {
                //Product not in cart yet
                _newState.currCart[_attr_now] =
                    {
                        "product": action.payload.product,
                        "amount": action.payload.amount,
                        "color": action.payload.color,
                        "size": action.payload.size
                    };
            }
            else {
                //Attributes had been add to cart
                _newState.currCart[_attr_now].product = action.payload.product;
                _newState.currCart[_attr_now].amount = +_newState.currCart[_attr_now].amount + +action.payload.amount;
                _newState.currCart[_attr_now].color = action.payload.color;
                _newState.currCart[_attr_now].size = action.payload.size;
            }
            _newState.timestamp = Date.now();
            AsyncStorage.setItem('currCart', JSON.stringify(_newState.currCart));
            return _newState;
        case Actions.REMOVE_ITEM_FROM_CART:
            _newState = {...state};
            _product = action.payload.product;
            _attr_remove = `${_product.pro_id}_${_product.cart_color}_${_product.cart_size}`;
            if (_newState.currCart.hasOwnProperty(_attr_remove)) {
                delete(_newState.currCart[_attr_remove]);
            }
            _newState.timestamp = Date.now();
            return _newState;
        case Actions.CLEAR_CART:
            return {
                ...state,
                timestamp: Date.now(),
                currCart: []
            };
        case Actions.PLACE_ORDER:
            return {
                ...state,
                isPlacingOrder: true,
                successOrder: {},
                paymentType: action.payload.params.payments,
                transactionDetail: {
                    data: {},
                    isFetching: false
                },
                onlinePayment: {
                    isProcess: false,
                    isDone: null,
                    data: {}
                },
                authTransaction: {
                    isProcess: false,
                    isSuccess: null,
                    data: {}
                },
            };
        case Actions.PLACE_ORDER_FAIL:
            Toast.show(action.payload.error);
            return {
                ...state,
                isPlacingOrder: false
            };
        case Actions.PLACE_ORDER_SUCCESS:
            Toast.show("Đặt hàng thành công");
            return {
                ...state,
                timestamp: Date.now(),
                currCart: [],
                isPlacingOrder: false,
                successOrder: action.payload.data
            };
        case Actions.VALIDATE_SALE_OFF:
            return {
                ...state,
                isValidateSaleOff: true,
                isValidSaleOffId: null,
                error: "",
                saleOffInfo: {}
            };
        case Actions.VALIDATE_SALE_OFF_SUCCESS:
            return {
                ...state,
                isValidSaleOffId: true,
                isValidateSaleOff: false,
                error: "",
                saleOffInfo: action.payload.data
            };
        case Actions.VALIDATE_SALE_OFF_FAIL:
            return {
                ...state,
                isValidSaleOffId: false,
                isValidateSaleOff: false,
                error: ""
            };
        case Actions.GET_ORDERS:
            _newState = {...state};
            _newState['ordersList' + action.payload.params.status].isFetching = true;
            return _newState;
        case Actions.GET_ORDERS_SUCCESS:
            _newState = {...state};
            _list = 'ordersList' + action.payload.params.status;
            if (action.payload.params.page > _newState[_list].params.page) {
                _newState[_list].items = [..._newState[_list].items, ...action.payload.items];
            } else if (action.payload.params.page === 1) {
                _newState[_list].items = action.payload.items;
            }
            if (!action.payload.items.length) {
                _newState[_list].isEnd = true;
            }
            _newState[_list].params = {..._newState[_list].params, ...action.payload.params};
            _newState[_list].isFetching = false;
            return _newState;
        case Actions.GET_ORDERS_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state};
            _newState['ordersList' + action.payload.params.status].isFetching = false;
            _newState.error = action.payload.error;
            return _newState;
        case Actions.CANCEL_ORDER:
            _newState = {...state};
            _newState.isCancellingOrder = true;
            _newState.bCancelSuccess = null;
            return _newState;
        case Actions.CANCEL_ORDER_SUCESS:
            _newState = {...state};
            _newState.isCancellingOrder = false;
            _newState.bCancelSuccess = true;
            return _newState;
        case Actions.CANCEL_ORDER_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state}
            _newState.isCancellingOrder = false;
            _newState.bCancelSuccess = false;
            return _newState;
        case Actions.ONLINE_PAYMENT:
            _newState = {...state};
            _newState.onlinePayment.isProcess = true;
            _newState.onlinePayment.isDone = false;
            _newState.onlinePayment.data = {};
            return _newState;
        case Actions.ONLINE_PAYMENT_SUCCESS:
            _newState = {...state};
            _newState.onlinePayment.isProcess = false;
            _newState.onlinePayment.isDone = true;
            _newState.onlinePayment.data = action.payload.data;
            return _newState;
        case Actions.ONLINE_PAYMENT_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state};
            _newState.onlinePayment.isProcess = false;
            _newState.onlinePayment.isDone = false;
            _newState.onlinePayment.data = {};
            return _newState;
        case Actions.AUTHEN_TRANSACTION:
            _newState = {...state};
            _newState.authTransaction.isProcess = true;
            _newState.authTransaction.isSuccess = null;
            _newState.authTransaction.data = {};
            return _newState;
        case Actions.AUTHEN_TRANSACTION_SUCCESS:
            _newState = {...state};
            _newState.authTransaction.isProcess = false;
            _newState.authTransaction.isSuccess = true;
            _newState.authTransaction.data = action.payload.data;
            return _newState;
        case Actions.AUTHEN_TRANSACTION_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state};
            _newState.authTransaction.isProcess = false;
            _newState.authTransaction.isSuccess = false;
            _newState.authTransaction.data = {};
            return _newState;
        case Actions.GET_TRANSACTION_DETAIL:
            _newState = {...state};
            _newState.transactionDetail.isFetching = true;
            _newState.transactionDetail.data = {};
            return _newState;
        case Actions.GET_TRANSACTION_DETAIL_SUCCESS:
            _newState = {...state};
            _newState.transactionDetail.isFetching = false;
            _newState.transactionDetail.data = action.payload.items;
            return _newState;
        case Actions.GET_TRANSACTION_DETAIL_FAIL:
            Toast.show(action.payload.error || "Thanh toán không thành công!");
            _newState = {...state};
            _newState.transactionDetail.isFetching = false;
            _newState.transactionDetail.data = {};
            return _newState;
        case Actions.GET_ATM_ACCOUNT:
            _newState = {...state};
            _newState.atmCardInfo.isFetching = true;
            _newState.atmCardInfo.data = {};
            return _newState;
        case Actions.GET_ATM_ACCOUNT_SUCCESS:
            _newState = {...state};
            _newState.atmCardInfo.isFetching = false;
            _newState.atmCardInfo.data = action.payload.items;
            return _newState;
        case Actions.GET_ATM_ACCOUNT_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state};
            _newState.atmCardInfo.isFetching = false;
            _newState.atmCardInfo.data = {};
            return _newState;
        case Actions.GET_IB_ACCOUNT:
            _newState = {...state};
            _newState.ibCardInfo.isFetching = true;
            _newState.ibCardInfo.data = {};
            return _newState;
        case Actions.GET_IB_ACCOUNT_SUCCESS:
            _newState = {...state};
            _newState.ibCardInfo.isFetching = false;
            _newState.ibCardInfo.data = action.payload.items;
            return _newState;
        case Actions.GET_IB_ACCOUNT_FAIL:
            Toast.show(action.payload.error);
            _newState = {...state};
            _newState.ibCardInfo.isFetching = false;
            _newState.ibCardInfo.data = {};
            return _newState;
        case Actions.UPDATE_ATM_ACCOUNT_FAIL:
        case Actions.UPDATE_IB_ACCOUNT_FAIL:
            Toast.show(action.payload.error);
            return {
                ...state,
                isUpdateBankAccount: false
            };
        case Actions.UPDATE_ATM_ACCOUNT:
        case Actions.UPDATE_IB_ACCOUNT:
            return {
                ...state,
                isUpdateBankAccount: true
            };
        case Actions.UPDATE_ATM_ACCOUNT_SUCCESS:
        case Actions.UPDATE_IB_ACCOUNT_SUCCESS:
            Toast.show(action.payload.data.message);
            return {
                ...state,
                isUpdateBankAccount: false,
            };
        default:
            return {...state};
    }
}

export default transaction;