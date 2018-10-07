import React, {Component} from 'react';
import {Button, Image, Text, TouchableOpacity, View, ListView,WebView, Alert, BackHandler} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../configs/colors';
import * as Actions from "../../../actions";

class SupportDetail extends Component {

    constructor (props) {
        super(props);

    }
    static navigationOptions = ({ navigation }) => {

        return {
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={"md-person"}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
            swipeEnabled: false,
            title: navigation.state.params.route.label,
            tabBarLabel: null,
        }
    };

    handleBackButtonClick() {
        Alert.alert(
            'Quit App',
            'Are you sure want to quit Abatoba?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false }
        );
        // this.props.navigation.goBack(null);
        return true;
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.dispatch(Actions.getSupportDetail({name:this.props.navigation.state.params.route.name}));
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentDidMount () {
    }

    render () {
        content = this.props.supportDetail;
        const htmlSrc = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
        <meta charset="utf-8">
        </head>
        
        <body>
        ${content}
        </body>
        </html>`;
        return(
            <View style={{flex:1}}>
            {content.length ? (
            <WebView source={{html: htmlSrc,baseUrl:''}}

            />):null}
            </View>
        );

    }
}

function mapStateToProps ({nav, auth}) {
    return {
        supportDetail:auth.supportDetail,
        isFetching:auth.bIsLoading
    }
}

export default connect(mapStateToProps, null)(connectAlert(SupportDetail));
