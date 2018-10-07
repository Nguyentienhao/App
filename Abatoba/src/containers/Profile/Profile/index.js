import React, {Component} from 'react';
import { Text, TouchableOpacity, Platform, View, ListView, Alert, BackHandler} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../configs/colors';
import {jumpTo, doLogout} from "../../../actions";
import {translate} from '../../../languages/locale';
import _ from "lodash";

class Profile extends Component {

    constructor (props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        /*TODO: Add more items here */
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    key: 1,
                    items: [
                        {
                            icon: 'md-person',
                            label: 'Profile Info',
                            routeName: 'ProfileInfo'
                        },
                        {
                            icon: 'ios-clock-outline',
                            label: 'Transactions',
                            routeName: 'Transactions'
                        },
                        {
                            icon: 'ios-card-outline',
                            label: 'Thông Tin Tài Khoản Ngân Hàng',
                            routeName: 'BankAccount',
                        }
                        // {
                        //     icon: 'md-settings',
                        //     label: 'Settings',
                        //     routeName: 'Settings'
                        // }
                    ]
                },
                {
                    key: 2,
                    items: [
                        // {
                        //     icon: 'ios-mail-outline',
                        //     label: 'Invite Friends',
                        //     routeName: 'InviteFriend'
                        // },
                        // {
                        //     icon: 'ios-information-circle-outline',
                        //     label: 'Term of service',
                        //     routeName: 'SupportDetail',
                        //     name:'about'
                        // },
                        // {
                        //     icon: 'md-ribbon',
                        //     label: 'Security',
                        //     routeName: 'SupportDetail',
                        //     name:'security'
                        // },
                        // {
                        //     icon: 'ios-card',
                        //     label: 'Payment',
                        //     routeName: 'SupportDetail',
                        //     name:'payment'
                        // },
                        {
                            icon: 'ios-chatboxes-outline',
                            label: 'Feedback',
                            routeName: 'Feedback',
                            successRoute: 'Feedback',
                            backRoute: 'Profile'
                        }
                        // {
                        //     icon: 'ios-information-circle-outline',
                        //     label: ('Application Support'),
                        //     routeName: 'ApplicationSupport'
                        // }
                    ]
                },
                {
                    key: 3,
                    items: [
                        {
                            icon: 'ios-power-outline',
                            label: 'Login',
                            routeName: 'Login',
                            backRoute: 'Profile'
                        }
                    ]
                },
                {
                    key: 4,
                    items: [
                        {
                            icon: 'ios-power-outline',
                            label: 'Logout',
                            routeName: 'Login',
                            confirm: true,
                            confirmMessage: 'Are you sure want to logout?'
                        }
                    ]
                },
            ]),
        };
    }

    static navigationOptions = ({navigation}) => {

        return {
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
            swipeEnabled: false,
            title: translate('Profile'),
            tabBarLabel: null,
        }
    };

    handleBackButtonClick () {
        Alert.alert(
            translate('Quit App'),
            translate('Are you sure want to quit Abatoba?'),
            [
                {text: translate('Cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: translate('OK'), onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false}
        );
        // this.props.navigation.goBack(null);
        return true;
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount () {
    }

    setRouteName (routeName) {
        switch (routeName) {
            case 'Feedback':
                if (_.isEmpty(this.props.oUser)) {
                    return 'Login';
                }
                return 'Feedback';
            default :
                return routeName;
        }
    }

    render () {
        let _onClickItem = (item) => {
            if (item.hasOwnProperty('confirm') && item.confirm) {
                Alert.alert(
                    translate('Confirm'),
                    translate(item.confirmMessage),
                    [
                        {text: translate('Cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {
                            text: translate('OK'),
                            onPress: item.label !== "Logout" ? () => this.props.navigation.dispatch(jumpTo(item.routeName))
                                :
                                () => {
                                    this.props.navigation.dispatch(doLogout());
                                    // this.props.navigation.dispatch(jumpTo(item.routeName, {}, item.successRoute || null, item.backRoute || null))
                                }
                        },
                    ],
                    {cancelable: false}
                );
            } else {
                this.props.navigation.dispatch(jumpTo(this.setRouteName(item.routeName), {}, item.successRoute || null, item.backRoute || null));
            }
        };
        let Row = (props) => {
            if (props.label === 'Login' && !_.isEmpty(this.props.oUser)) {
                return null;
            }
            if (_.isEmpty(this.props.oUser) && props.label !== 'Login') {
                return null;
            }
            if (props.label === 'Logout' && _.isEmpty(this.props.oUser)) {
                return null;
            }

            return (
                <TouchableOpacity key={props.routeName} style={styles.rowContainer} onPress={() => _onClickItem(props)}>
                    <View style={styles.innerLeft}>
                        <Ionicons
                            name={props.icon}
                            size={26}
                            style={[{color: colors.inactiveTintColor}, styles.innerIcon]}
                        />
                        <Text style={styles.rowText}>
                            {translate(props.label)}
                        </Text>
                    </View>
                    {/*<Ionicons*/}
                        {/*name={'ios-arrow-forward'}*/}
                        {/*size={26}*/}
                        {/*style={{color: colors.inactiveTintColor, fontSize: 22,}}*/}
                    {/*/>*/}
                </TouchableOpacity>
            )
        };

        let Group = (props) => (
            <View>
                {props.items.map((item) => <Row key={item.routeName} {...item} />)}
            </View>
        );

        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <Group {...data} />}
            />
        )
    }
}

function mapStateToProps ({ui, auth}) {
    return {
        language: ui.language,
        oUser: auth.oUser
    }
}

export default connect(mapStateToProps, null)(Profile);
