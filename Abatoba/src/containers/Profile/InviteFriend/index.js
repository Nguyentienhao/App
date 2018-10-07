import React, {Component} from 'react';
import {Button, Text, View, BackHandler, TextInput} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-loading-spinner-overlay";
import {translate} from "../../../languages/locale";
import * as Actions from "../../../actions";

class InviteFriend extends Component {

    constructor (props) {
        super(props);

        this.state = {
            email: ''
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick () {
        this.props.navigation.goBack(null);
        return true;
    }

    _sendInviteFriend () {
        if (this.state.email) {
            this.props.dispatch(Actions.sendInviteFriend(this.state));
        }
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    static navigationOptions = ({navigation}) => {

        return {
            title: translate('Invite friend'),
            tabBarLabel: translate('Invite friend'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={"md-person"}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            swipeEnabled: false
        }
    };
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        alertWithType: PropTypes.func,
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.isSuccess) {
            this.setState({email: ''});
        }
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount () {
    }


    render () {
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.props.isFetching} color="#0074D9"/>
                <View style={styles.feedbackSection}>
                    <View style={styles.labelIcon}>
                        <Ionicons name={"ios-send"} size={26} style={{color: '#616161', width: 25}}/>
                        <Text
                            style={styles.rowInfo}>{translate('Your friend email')}</Text>
                    </View>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder={translate('Email')}
                            placeholderTextColor={"grey"}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={styles.sendBtn}>
                        <Button onPress={() => {
                            this._sendInviteFriend()
                        }} title={translate('Send')} color="#616161"/>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps ({profile, auth}) {
    return {
        isFetching: auth.bIsLoading,
        isSuccess: profile.isSuccess
    }
}

export default connect(mapStateToProps, null)(connectAlert(InviteFriend));
