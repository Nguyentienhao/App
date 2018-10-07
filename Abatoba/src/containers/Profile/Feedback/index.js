import React, {Component} from 'react';
import {Text, View, BackHandler, TextInput} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-loading-spinner-overlay";
import {translate} from "../../../languages/locale";
import * as Actions from "../../../actions";
import colors from './../../../configs/colors';
import Button from 'react-native-button';

class Feedback extends Component {

    constructor (props) {
        super(props);

        this.state = {
            message: '',
            borderColor: '#74726D'
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick () {
        this.props.navigation.goBack(null);
        return true;
    }

    _sendFeedback () {
        this.props.dispatch(Actions.sendFeedback(this.state));
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    static navigationOptions = ({navigation}) => {

        return {
            title: translate('Feedback'),
            tabBarLabel: translate('Feedback'),
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
            this.setState({message: ''});
        }
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount () {
    }

    onFocus() {
        this.setState({
            borderColor: '#FF9800',
        })
    }

    render () {
        let user = this.props.oUser;
        return (
            !this.props.bIsLoggedIn ? <View><Text>User not found</Text></View> :
                <View style={styles.container}>
                    <Spinner visible={this.props.isFetching} color="#0074D9"/>
                    <View style={styles.fbFromUsername}>
                        <Text style={{ color: '#74726D'}}>Từ: "{this.props.oUser.full_name}"</Text>
                    </View>
                    <View style={styles.textAreaContainer}>
                        <TextInput
                        style={[{ borderBottomColor: this.state.borderColor}, styles.textArea]}
                            underlineColorAndroid="transparent"
                            placeholder="Viết phản hồi của bạn"
                            placeholderTextColor={"grey"}
                            multiline={true}
                            onChangeText={(message) => this.setState({message})}
                            value={this.state.message}
                            onFocus={() => this.onFocus()}
                        />
                    </View>
                    <View style={styles.sendBtnRow}>
                        <Button style={styles.sendBtn} onPress={() => {
                                this._sendFeedback()
                        }}color="#616161">GỬI</Button>
                    </View>
                </View>
        )
    }
}

function mapStateToProps ({profile, auth}) {
    return {
        oUser: auth.oUser,
        isFetching: auth.bIsLoading,
        bIsLoggedIn: auth.bIsLoggedIn,
        isSuccess: profile.isSuccess
    }
}

export default connect(mapStateToProps, null)(connectAlert(Feedback));
