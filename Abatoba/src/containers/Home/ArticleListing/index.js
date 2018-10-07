import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image,
    Alert,
    BackHandler,
    ScrollView,
    TouchableHighlight,
    Button
} from 'react-native';
import {connect} from "react-redux";
import * as Actions from "../../../actions";
import { connectAlert } from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from './../../../configs/colors';
import StatusBarBackground from '../../../components/StatusBarBackground';
import HeaderSearch from '../../HeaderSearch';
import Categories from './../../../components/Articles/Category';
import Articles from './../../../components/Articles/Items';
import _ from 'lodash';

class ArticlesLising extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                    size={22}
                    style={{ color: tintColor }}
                />
            ),
            swipeEnabled: true,
            header: null,
            title: 'Article Listing'
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._fetchData();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _fetchData() {
        let limit = 9, page = 1, proLimit = 4;
        this.props.dispatch(Actions.getArticles({
            isListing: true,
            cate_id: this.props.navigation.state.params.artcate.cate_id
        }));     
    }

    render() {
        return (
           <View style={styles.container}>
                <StatusBarBackground />
                <HeaderSearch hasBack={true}/>
                {this.renderCategories()}
                <ScrollView>
                    {this.renderArticles()}
                    <View style={{paddingBottom: 40}}/>
                </ScrollView>
           </View>
        );
    }

    renderCategories() {
        let { categories, isFetchingCategories } = this.props;
        let artcate = this.props.navigation.state.params.artcate;
        return(
            isFetchingCategories ? null : <Categories isListing={true} type={"articlesListing"} dispatch={this.props.dispatch} artcate={artcate} data={categories} />
        )
    }

    renderArticles() {
        let { articlesListingByCate } = this.props;
        return (
            _.isEmpty(articlesListingByCate) ? (this.props.isFetchingArticlesListing ? <Text style={{textAlign: 'center', padding: 10, fontSize: 14}}>Vui lòng đợi...</Text> : <Text style={{textAlign: 'center', padding: 10, fontSize: 14}}>Không có bài viết nào</Text>) : <Articles data={articlesListingByCate} dispatch={this.props.dispatch} pageName="articles-listing" />
        )
    }

}

const mapStateToProps = state => {
    return {
        categories: state.category.articlesCategories,
        isFetchingCategories: state.category.isFetching,
        articlesListingByCate: state.article.articlesListingByCate,
        isFetchingArticlesListing: state.article.isFetchingArticlesListing,
    }
}

export default connect(mapStateToProps, null)(connectAlert(ArticlesLising));