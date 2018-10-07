import React, {Component} from 'react';
import {Button, Image, Text, TouchableOpacity, View, ScrollView, FlatList, BackHandler, WebView} from 'react-native';
import styles from './styles';
import colors from './../../../configs/colors';
import {connect} from "react-redux";
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Actions from "../../../actions";
import HeaderSearch from '../../HeaderSearch';
import _ from 'lodash';
import Spinner from "react-native-loading-spinner-overlay";
import DetailBanner from '../../../components/Articles/DetailBanner';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import StatusBarBackground from '../../../components/StatusBarBackground';

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            idArt: this.props.articleDetail.art_id || '',
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    static navigationOptions = ({navigation}) => {
        return {
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={"md-home"}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            swipeEnabled: false,
            title: 'Tin tức',
            headerStyle: {
                backgroundColor: '#fff',
                borderWidth: 0,
                borderBottomColor: '#fff'
            },
        }
    };
    componentWillUpdate(nextProps) {
        if (!nextProps.isFetchingArtDetail && nextProps.articleDetail.art_id !== this.state.idArt) {
            let art_id = nextProps.articleDetail.art_id;
            this.props.navigation.dispatch(Actions.getRelatedArticles({
                art_id: art_id
            }))
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            idArt: nextProps.articleDetail.art_id || ''
        })
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.dispatch(Actions.clearArticle());
    }

    componentDidMount() {
        this._fetchData();
    }

    renderHeaderSearch = () => {
        return (
            <HeaderSearch hasBack={true}/>
        )
    }


    _fetchData() {
        this.props.dispatch(Actions.getArticleDetail({
            id: this.props.navigation.state.params.id,
        }));
        this.props.dispatch(Actions.getRelatedArticles({
            art_id: this.props.navigation.state.params.id,
        }));
    }

    renderRelated = () => {
        let related = this.props.relatedArticles;
        return (
            <View>
                <View style={styles.tabBar}>
                    <Text style={styles.artRelatedLabel}>Tin liên quan</Text>
                </View>
                <View>
                    {(related.length > 0) ? related.map((newsItem, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.artRelatedItem}
                                                onPress={() => this.props.dispatch(Actions.jumpTo('ArticleDetail', {
                                                    id: newsItem.art_id,
                                                }))}
                            >
                                <View style={styles.artRelatedInfo}>
                                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                                            style={styles.artRelatedTitle}>{newsItem.art_name}</Text>
                                    <View style={styles.artRelatedDate}>
                                        <Text style={{color: colors.textColorSecondary}}>{moment(`${newsItem.art_created_datetime}`).format('DD/MM/YYYY')}</Text>
                                        <Text style={{color: colors.textColorSecondary}}>{`ID: ${newsItem.art_id}`}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }) : null}
                </View>
                
            </View>
        )   
    }

    renderContent() {
        let article = this.props.articleDetail;
        if(typeof article !== 'undefined'){
            return (
                <View>
                    <DetailBanner news={article} />
                    <HTMLView value={article.art_content} style={styles.artDesBlock} />
                </View>
            )
        }
    }

    render() {
        let article = this.props.articleDetail;
        return (
            <View style={styles.container}>
                <StatusBarBackground />
                {this.renderHeaderSearch()}
                <ScrollView>
                    {_.isEmpty(article) ?
                        <Spinner visible={this.props.isFetchingArtDetail} color="#0074D9"/> :
                        this.renderContent()
                    }
                    {this.props.isFetchingRelatedArticles ? null : this.renderRelated()}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({article}) {
    return {
        articleDetail: article.articleDetail.items.length ? article.articleDetail.items.slice(-1)[0] : {},
        isFetchingArtDetail: article.articleDetail.isFetching,
        relatedArticles: article.relatedArticles,
        isFetchingRelatedArticles: article.isFetchingRelatedArticles
    }
}

export default connect(mapStateToProps, null)(connectAlert(ArticleDetail));
