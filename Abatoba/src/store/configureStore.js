import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
    const middlewares = [
        sagaMiddleware
    ];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger);
    }

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    const store = createStore(
        rootReducer,
        initialState,
        compose(...enhancers)
    );

    store.runSaga = sagaMiddleware.run;

    return store;
}
