import {takeEvery} from "redux-saga/effects";
import * as Actions from '../actions';
import AuthSagas from './auth';
import UISaga from './ui';
import ProductSaga from './product';
import CategorySaga from './category';
import ArticleSaga from './article';
import TransactionSaga from './transaction';
import ProfileSaga from './profile';

function* rootSaga() {
    yield takeEvery(Actions.LOGIN, AuthSagas.login);
    yield takeEvery(Actions.LOGOUT, AuthSagas.logout);
    yield takeEvery(Actions.REGISTER, AuthSagas.register);
    yield takeEvery(Actions.LOAD_AUTH_FROM_LOCAL, AuthSagas.loadAuthFromLocal);
    yield takeEvery(Actions.LOAD_DEFAULT_STATES, UISaga.loadDefaultStates);
    yield takeEvery(Actions.GET_PRODUCTS, ProductSaga.getProducts);
    yield takeEvery(Actions.GET_CATEGORIES_HIERARCHICALLY, CategorySaga.getCategories);
    yield takeEvery(Actions.GET_PRODUCT_DETAIL, ProductSaga.getProductDetail);
    yield takeEvery(Actions.GET_ARTICLES, ArticleSaga.getArticles);
    yield takeEvery(Actions.GET_ARTICLE_DETAIL, ArticleSaga.getArticleDetail);
    yield takeEvery(Actions.GET_RELATED_ARTICLES, ArticleSaga.getRelatedArticles);
    yield takeEvery(Actions.GET_ORDERS, TransactionSaga.getOrders);
    yield takeEvery(Actions.GET_SLIDERS, ProductSaga.getSliders);
    yield takeEvery(Actions.GET_CART_FROM_LOCAL, TransactionSaga.getCartFromLocal);
    yield takeEvery(Actions.PLACE_ORDER, TransactionSaga.placeOrder);
    yield takeEvery(Actions.VALIDATE_SALE_OFF, TransactionSaga.validateSaleOff);
    yield takeEvery(Actions.SEARCH, ProductSaga.search);
    yield takeEvery(Actions.CANCEL_ORDER, TransactionSaga.cancelOrder);
    yield takeEvery(Actions.UPDATE_USER_PROFILE,AuthSagas.updateUserInfo);
    yield takeEvery(Actions.SEND_FEED_BACK, ProfileSaga.sendFeedback);
    yield takeEvery(Actions.REQUEST_RESET_PASSWORD, AuthSagas.requestResetPassword);
    yield takeEvery(Actions.VERIFY_CODE, AuthSagas.verifyCode);
    yield takeEvery(Actions.UPLOAD_AVATAR, AuthSagas.uploadAvatar);
    yield takeEvery(Actions.ONLINE_PAYMENT, TransactionSaga.onlinePayment);
    yield takeEvery(Actions.AUTHEN_TRANSACTION, TransactionSaga.authenTransaction);
    yield takeEvery(Actions.GET_TRANSACTION_DETAIL, TransactionSaga.getTransactionDetail);
    yield takeEvery(Actions.GET_ATM_ACCOUNT, TransactionSaga.getAtmAccount);
    yield takeEvery(Actions.GET_IB_ACCOUNT, TransactionSaga.getIbAccount);
    yield takeEvery(Actions.UPDATE_ATM_ACCOUNT, TransactionSaga.updateAtmAccount);
    yield takeEvery(Actions.UPDATE_IB_ACCOUNT, TransactionSaga.updateIbAccount);
    yield takeEvery(Actions.CHANGE_PASSWORD, AuthSagas.changePassword);
}

export default rootSaga;