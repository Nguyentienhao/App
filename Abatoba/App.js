import React, {Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from "./src/store/configureStore";
import AppWithNavigationState from './src/navigators/AppNavigator';
import rootSaga from "./src/sagas";
import EStyleSheet from "react-native-extended-stylesheet";
const store = configureStore();
store.runSaga(rootSaga);

import { AlertProvider } from './src/components/alertDropdown';
EStyleSheet.build({
    // $outline: 1
});
// Disable warnings
console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider>
                    <AppWithNavigationState />
                </AlertProvider>
            </Provider>
        );
    }
}