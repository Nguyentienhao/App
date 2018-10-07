import {NavigationActions} from 'react-navigation';
import {AppNavigator} from '../navigators/AppNavigator';
import * as Actions from '../actions';

// Start with Login Screen
// const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({
//             routeName: 'Loading',
//         }),
//     ],
// }));
const initialNavState = AppNavigator.router.getStateForAction({});
/* Change routeName here to set initial screen */
// const initialNavState = AppNavigator.router.getStateForAction(
//     NavigationActions.navigate({ routeName: "Loading" }),
//     firstState
// );

export default function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: state.successRoute || 'HomeIndex' }),
                state
            );
            break;
        case Actions.LOGOUT_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'Login'}),
                state
            );
            break;
        case Actions.JUMP_TO:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate(action.payload),
                state
            );
            nextState.successRoute = action.payload.successRoute;
            nextState.backRoute = action.payload.backRoute;
            break;
        case Actions.REGISTER_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: "HomeIndex"}),
                state
            );
            break;
        case Actions.REQUEST_RESET_PASSWORD_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: "VerifyCode" }),
                state
            );
            break;
        case Actions.VERIFY_CODE_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: "Login" }),
                state
            );
            break;
        case Actions.PLACE_ORDER_SUCCESS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: "ProcessOrder" }),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
}