import React, {Component} from 'react';
import {Button, Image, Text, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import {connect} from "react-redux";
import * as Actions from "../../actions";
import styles from './styles';
import _ from 'lodash';

class Loading extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation}) => {
        return {
            swipeEnabled: false,
            header: null
        }
    };

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.dispatch(Actions.setPosition({position: position}));
            },
            (error) => {
                this.props.dispatch({type: Actions.GET_POSITION_FAIL, payload: {error: error}})
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 5000 }
        );
        this.props.dispatch({type: Actions.LOAD_AUTH_FROM_LOCAL});
        this.props.dispatch(Actions.getCartFromLocal());
    }

    componentDidMount() {
        /*TODO: Remove nav dispatch here*/
        // this.props.navigation.dispatch(Actions.jumpTo("HomeIndex"));
    }

    isLoaded() {
        // TODO: put more conditions here if needed
        if(!_.isEmpty(this.props.oUser))
        return true;
        return false;
    }

    componentDidUpdate() {
        if (this.isLoaded()) {
            this.props.navigation.dispatch(Actions.jumpTo("HomeIndex"));
        }
        else {
            this.props.navigation.dispatch(Actions.jumpTo("HomeIndex"));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#000" style={styles.spinner}/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        oUser:state.auth.oUser
    }
}

export default connect(mapStateToProps, null)(Loading);
