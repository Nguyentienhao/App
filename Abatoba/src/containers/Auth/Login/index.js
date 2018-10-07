import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    BackHandler,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    ActivityIndicator
} from 'react-native';

import styles from './styles';
import { connect } from "react-redux";
import { connectAlert } from '../../../components/alertDropdown';
import { translate } from '../../../languages/locale';
import StatusBarBackground from './../../../components/StatusBarBackground';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './../../../configs/colors';
import * as Actions from './../../../actions';
import Toast from "react-native-simple-toast";
import images from '../../../images/index';

const { width } = Dimensions.get("window");

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state = {
            username: '',
            password: '',
            isRemember: false,
            isPassHide: true,
            isLoading: true,
            canPress: false
        };
    }

    handleBackButtonClick() {
        this.props.navigation.dispatch(Actions.jumpTo(this.props.backRoute || 'Profile'));
        return true;
    }

    static navigationOptions = {
        title: translate('Log In'),
    };

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        alertWithType: PropTypes.func,
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            console.log(nextProps);
            this.props.alertWithType('error', 'Error', nextProps.error);
            
            this.setState({
                isLoading: !this.state.isLoading
            })
        }
    }

    signUpOnPress() {
        this.props.navigation.dispatch(Actions.jumpTo('Register'));
    }

    forgotOnPress() {
        this.props.navigation.dispatch(Actions.jumpTo('ForgotPass'));
    }

    loginOnPress() {
        if (this.state.username === '' || this.state.password === '') {
            Toast.show("Vui lòng nhập tên đăng nhập và mật khẩu");
            return;
        } else {
            if (this.state.isLoading) {
                this.setState({
                    isLoading: !this.state.isLoading
                })
            }
            this.props.navigation.dispatch(Actions.doLogin(this.state.username, this.state.password));
        }
        
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    showPassword = () => {
        this.state.canPress === false
            ? this.setState({ isPassHide: false, canPress: true })
            : this.setState({ isPassHide: true, canPress: false })
    }

    handleLoading = () => {
        if (this.state.isLoading) {
            return (
                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={() => this.loginOnPress()}
                    activeOpacity={1}
                >
                    <Text style={styles.btnLoginText}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <View>
                    <ActivityIndicator
                        size="small" color={colors.loadPrimary}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#FFF' }}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <StatusBarBackground />
                    <View style={styles.loginContainer}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={images.logo} />
                        </View>

                        <Text style={styles.headline}>Đăng nhập</Text>

                        <View style={styles.inputSection}>
                            <Ionicons
                                name="md-person"
                                size={24}
                                style={styles.iconInput}
                            />
                            <TextInput
                                style={[styles.userInput]}
                                placeholder={'Tài khoản'}
                                autoCapitalize='none'
                                onChangeText={(username) => this.setState({ username })}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                ref="userName"
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.focusNextField('password')}
                                returnKeyType={"next"}
                            />
                        </View>

                        <View style={styles.inputSection}>
                            <Ionicons name="md-lock" size={24} style={styles.iconInput} />
                            <TextInput
                                style={[styles.userInput]}
                                placeholder={'Mật khẩu'}
                                placeholderTextColor=""
                                autoCapitalize='none'
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry={this.state.isPassHide}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                ref="password"
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.loginOnPress()}
                            />
                            <View
                                style={styles.buttonEye}>
                                <TouchableOpacity
                                    activeOpacity={0.3}
                                    onPress={this.showPassword}>
                                    {
                                        this.state.isPassHide
                                            ? <Ionicons name="md-eye-off" size={20}></Ionicons>
                                            : <Ionicons name="md-eye" size={20}></Ionicons>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

                        {
                            this.handleLoading()
                        }

                        <View style={styles.loginForgotBlock}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.forgotOnPress()}>
                                    <Text style={{ fontSize: 12, textAlign: 'left' }}>Quên mật khẩu</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.signUpOnPress()}>
                                    <Text style={{ fontSize: 12, textAlign: 'right' }}>Tạo tài khoản</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.viewTextLoginWith}>
                        <Text style={styles.textLoginWith}>---------------</Text>
                        <Text style={[styles.textLoginWith, { marginHorizontal: 6 }]}>
                            {'Hoặc đăng nhập với'}
                        </Text>
                        <Text style={styles.textLoginWith}>---------------</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 25 }}>
                        <View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity style={[styles.opaIconLogin, { backgroundColor: "#3B5998", marginBottom: 20 }]} >
                                <Icon name="facebook" size={30} style={styles.iconLogin} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.opaIconLogin, { backgroundColor: "#EA4335", marginBottom: 20 }]}>
                                <Icon name="google" size={30} style={styles.iconLogin} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

function mapStateToProps({ nav, auth }) {
    return {
        error: auth.error,
        isFetching: auth.bIsLoading,
        successRoute: nav.successRoute,
        backRoute: nav.backRoute
    }
}

export default connect(mapStateToProps, null)(connectAlert(Login));
