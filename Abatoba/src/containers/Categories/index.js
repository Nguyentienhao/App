import React, {Component} from 'react';
import { Button, Platform, Image, Text, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator, BackHandler, InteractionManager} from 'react-native';
import {connect} from "react-redux";
import * as Actions from "../../actions";
import styles from './styles';
import HeaderSearch from '../HeaderSearch';
import CategoryList from './../../components/CategoryList';
import StatusBarBackground from '../../components/StatusBarBackground';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                    size={22}
                    style={{ color: tintColor }}
                />
            ),
            swipeEnabled: false,
            header: null
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isReady: true
            }, () => this._fetchData());
        });
    }

    componentDidUpdate() {
    }

    _fetchData() {
        let limit = 9999, page = 1;
        this.props.dispatch(Actions.getCategories({type: `GetProductCates/${page}/${limit}`}));
    }
    renderHeaderSearch = () => {
        return (
            <HeaderSearch/>
        )
    }
    renderCategories() {
        let categories = this.props.categories;
        return (
            <CategoryList key={'categories'} aCategories={categories} dispatch={this.props.dispatch}
                          isFetching={this.props.isFetching} pageName="parent"/>
        )
    }

    render() {
        if(!this.state.isReady){
            return <ActivityIndicator />
        }
        return (
            <View style={styles.container}>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <ScrollView style={styles.body}>
                    {this.renderCategories()}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.category.productCategories,
        isFetching: state.category.isFetching
    }
}

export default connect(mapStateToProps, null)(Categories);
