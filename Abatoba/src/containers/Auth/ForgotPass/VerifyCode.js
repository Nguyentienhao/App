import React, { Component } from 'react';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import styles from './styles';
import { connect } from "react-redux";
import { connectAlert } from '../../../components/alertDropdown';
import { translate } from '../../../languages/locale';
import { jumpTo } from "../../../actions";
import Spinner from "react-native-loading-spinner-overlay";
import { doVerifyCode } from "../../../actions/auth";

class VerifyCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmCode: ""
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.props.alertWithType('error', 'Error', nextProps.error);
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    _verifyCode() {
        this.props.dispatch(doVerifyCode({ email: this.props.resetPasswordEmail, code: this.state.confirmCode }));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewHeader}>
                    <TouchableOpacity style={{ flex: 0.2, paddingTop: 15, paddingLeft: 10 }}>
                        <Text style={{ color: '#3b95c6', fontSize: 15 }}
                            onPress={() => this.props.navigation.dispatch(jumpTo('ForgotPass'))}>{translate('Back')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Forgot Password</Text>
                </View>
                <Spinner visible={this.props.isFetching} color="#0074D9" />
                <View style={styles.formGroup}>
                    <Text>Confirm Code: </Text>
                    <TextInput
                        style={styles.userInput}
                        placeholder='Confirm Code'
                        onChangeText={(confirmCode) => this.setState({ confirmCode })}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this._verifyCode()} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Reset password</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps({ nav, auth, ui }) {
    return {
        language: ui.language,
        resetPasswordEmail: auth.resetPasswordEmail,
        error: auth.error,
        isFetching: auth.bIsLoading
    }
}

export default connect(mapStateToProps, null)(connectAlert(VerifyCode));
