import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import LoginScreen from '../containers/Auth/Login';
import ForgotPassScreen from '../containers/Auth/ForgotPass';
import VerifyCodeScreen from '../containers/Auth/ForgotPass/VerifyCode';
import RegisterScreen from '../containers/Auth/Register';
import LoadingScreen from '../containers/Loading';
import HomeScreen from '../containers/Home/Home';
import ProductDetail from '../containers/Home/ProductDetail';
import CategoryDetail from '../containers/Home/CategoryDetail';
import ArticleDetail from '../containers/Home/ArticleDetail';
import ArticlesLising from '../containers/Home/ArticleListing';
import CategoriesScreen from '../containers/Categories';
import CartScreen from '../containers/Cart/Cart';
import ProfileScreen from '../containers/Profile/Profile';
import ProfileInfoScreen from '../containers/Profile/ProfileInfo';
import TransactionsScreen from '../containers/Cart/History';
import ProcessOrder from '../containers/Cart/ProcessOrder';
import FeedbackScreen from '../containers/Profile/Feedback';
import BankAccountScreen from '../containers/Profile/BankAccount';
import InviteFriendScreen from '../containers/Profile/InviteFriend';
import SupportScreen from '../containers/Profile/ApplicationSupport';
import SupportDetailScreen from '../containers/Profile/ApplicationSupport/SupportDetail';
import SettingsScreen from '../containers/Profile/Settings';
import SearchScreen from '../containers/Search';
import HomeSearch from '../containers/Home/HomeSearch';
import colors from '../configs/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {translate} from '../languages/locale'

const ProfileNavigator = StackNavigator({
    ProfileIndex: {
        screen: ProfileScreen,
        navigationOptions: ({navigation}) => ({
            headerLeft: null
        })
    },
    Transactions: {
        screen: TransactionsScreen
    },
    ProfileInfo: {
        screen: ProfileInfoScreen,
        navigationOptions: {
            header: () => null
        }
    },
    InviteFriend: {
        screen: InviteFriendScreen
    },
    Feedback: {
        screen: FeedbackScreen
    },
    BankAccount: {
        screen: BankAccountScreen
    },
    ApplicationSupport: {
        screen: SupportScreen
    },
    SupportDetail: {
        screen: SupportDetailScreen
    },
    Settings: {
        screen: SettingsScreen
    },
});
const LoginNavigator = StackNavigator({
    LoginIndex: {
        screen: LoginScreen,
        navigationOptions: {
            header: () => null
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            header: () => null
        }
    }
});
const CartNavigator = StackNavigator({
    Cart: {
        screen: CartScreen
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            header: () => null
        }
    },
});
const CategoryNavigator = StackNavigator({
    CategoriesScreen: {
       screen: CategoriesScreen,
        navigationOptions: {
            header: () => null
        }
    },
    CategoryDetail: {
        screen: CategoryDetail,
        navigationOptions: {
            header: () => null
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            header: () => null
        }
    },
});
const HomeNavigator = StackNavigator({
    HomeIndex: {
        screen: HomeScreen,
        navigationOptions: {
            headerLeft: null
        }
    },
    ProductDetail: {
        screen: ProductDetail,
        navigationOptions: {
            header: () => null
        }
    },
    CategoryDetail: {
        screen: CategoryDetail,
        navigationOptions: {
            header: () => null
        }
    },
    ArticleDetail: {
        screen: ArticleDetail,
        navigationOptions: {
            header: () => null
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            header: () => null
        }
    },
    HomeSearch: {
        screen: HomeSearch,
        navigationOptions: {
            header: () => null
        }
    },
    ArticlesLising: {
        screen: ArticlesLising,
        navigationOptions: {
            header: () => null
        }
    },
}, {
    transitionConfig: (props) => {
        if (props.index > 0) {
            let currentScene = props.scene;
            let prevScene = props.scenes[props.index - 1];

            if (currentScene.route.routeName == 'Listing' && prevScene.route.routeName == 'HomeIndex') {
                return {
                    screenInterpolator: CardStackStyleInterpolator.forVertical,
                }
            }
        }

        return {
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }
    },
    initialRouteName: 'HomeIndex',
    lazy: true
});

export const AppNavigator = StackNavigator({
    Loading: {
        screen: LoadingScreen,
        navigationOptions: {
            header: () => null
        }
    },
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            header: () => null,
        }
    },
    ForgotPass: {
        screen: ForgotPassScreen,
        navigationOptions: {
            header: () => null,
        }
    },
    ProcessOrder: {
        screen: ProcessOrder,
        navigationOptions: {
            header: () => null,
        }
    },
    VerifyCode: {
        screen: VerifyCodeScreen,
        navigationOptions: {
            header: () => null,
        }
    },
    LoggedIn: {
        screen: TabNavigator({
                Home: {
                    screen: HomeNavigator,
                    navigationOptions: ({navigation}) => ({
                        header: null,
                        title: translate('Home')
                    }),
                },
                Categories: {
                    screen: CategoryNavigator,
                    navigationOptions: ({navigation}) => ({
                        header: null,
                        title: translate('Categories')
                    }),
                },
                Cart: {
                    screen: CartNavigator,
                    navigationOptions: ({navigation}) => ({
                        header: null,
                        title: translate('Cart')
                    }),
                },Profile: {
                    screen: ProfileNavigator,
                    navigationOptions: ({navigation}) => ({
                        header: null,
                        title: translate('Profile')
                    }),
                }
            },
            {
                lazy: true,
                tabBarPosition: 'bottom',
                tabBarOptions: {
                    activeTintColor: colors.activeTintColor,
                    inactiveTintColor: colors.inactiveTintColor,
                    labelStyle: {
                        fontSize: 12,
                        paddingBottom: 5,
                        marginTop: 1,
                    },
                    style: {
                        backgroundColor: colors.navBg,
                        paddingTop: 5,
                        borderTopWidth: EStyleSheet.hairlineWidth,
                        borderTopColor: '#eee',
                    },
                },
                initialRouteName: 'Home'
            })
    },
}, {initialRouteName: 'Loading'});

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const addListener = createReduxBoundAddListener("root");


const AppWithNavigationState = function ({dispatch, nav}) {
    let navigation = addNavigationHelpers({dispatch, state: nav, addListener});
    return (
        <AppNavigator navigation={navigation}/>
    );
};

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
    language: state.ui.language
});

export default connect(mapStateToProps, null)(AppWithNavigationState);