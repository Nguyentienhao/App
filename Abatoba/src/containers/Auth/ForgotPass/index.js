import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, Platform, ScrollView, Alert, BackHandler} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import {connectAlert} from '../../../components/alertDropdown';
import {translate} from '../../../languages/locale';
import {jumpTo} from "../../../actions";
import Spinner from "react-native-loading-spinner-overlay";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {doRequestResetPassword} from "../../../actions/auth";

class ForgotPass extends Component {

    constructor (props) {
        super(props);
        this.state = {
            email: ""
        }

    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.alertWithType('error', 'Error', nextProps.error);
        }
    }

    componentWillMount () {
    }

    componentDidMount () {
    }

    _sendCode () {
        this.props.dispatch(doRequestResetPassword(this.state.email));
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.viewHeader}>
                    <TouchableOpacity style={{ flex: 0.2, paddingTop: 15, paddingLeft: 10 }}>
                        <Text style={{ color: '#3b95c6', fontSize: 15 }}
                            onPress={() => this.props.navigation.dispatch(jumpTo('Login'))}>Hủy</Text>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Quên mật khẩu</Text>
                </View>
                <Spinner visible={this.props.isFetching} color="#0074D9" />
                <View style={styles.formGroup}>
                    <TextInput
                        style={styles.userInput}
                        placeholder='Vui lòng nhập email'
                        onChangeText={(email) => this.setState({ email })}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this._sendCode()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Gửi tôi mã xác nhận</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps({auth, ui}) {
    return {
        language: ui.language,
        error: auth.error,
        isFetching: auth.bIsLoading
    }
}

export default connect(mapStateToProps, null)(connectAlert(ForgotPass));
