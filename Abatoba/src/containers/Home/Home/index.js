import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    BackHandler,
    Platform,
    Alert,
    ActivityIndicator,
    InteractionManager
} from 'react-native';
import {connect} from "react-redux";
import FastImage from 'react-native-fast-image';
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {translate} from '../../../languages/locale';
import Products from './../../../components/Products';
import * as Actions from "../../../actions";
import StatusBarBackground from '../../../components/StatusBarBackground';
import styles from './styles';
import HeaderSearch from '../../HeaderSearch';
import CategoryList from './../../../components/CategoryList';
import Slider from './../../../components/Slider';
import Articles from './../../../components/Articles/Items';
import ArticlesCategory from '../../../components/Articles/Category';
import ProductAttribute from './../../../components/Products/Attributes';
import Toast from 'react-native-simple-toast';
import Modal from "react-native-modal";
import {formatMoney, currencySymbol} from '../../../services/format';
import _ from "lodash";
import getImagePath from "../../../services/getImagePath";
import colors from "../../../configs/colors";

class Home extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            refreshing: false,
            tabRecent: 1, // if === 1 ? show : hide
            tabBestSelling: 0, // if === 1 ? show : hide
            isTabProduct: true,
            isModalVisible: false,
            idProduct: "",
            amount: 1,
            note: "",
            item: {},
            artActiveId: 1,
            isReady: false
        }
    }

    handleBackButtonClick() {
        Alert.alert(
            translate('Quit App'),
            translate('Are you sure want to quit Hemas?'),
            [
                {text: translate('Cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: translate('OK'), onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false}
        );
        return true;
    }

    static navigationOptions = ({navigation}) => {
        return {
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                    size={22}
                    style={{color: tintColor}}
                />
            ),
            swipeEnabled: false,
            header: null,
            title: translate('Home')
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _fetchData() {
        let limit = 9, page = 1, proLimit = 4;
        if(!this.props.isFetchingCategories) {
            if (!this.props.homeProductCategories.length) {
                this.props.dispatch(Actions.getCategories({
                    type: `GetProductCates/${page}/${limit}`,
                    params: {
                        type: 'homeProCate'
                    }
                }));
            }
        }
        if(!this.props.isFetchingArticlesCategories) {
            if (!this.props.articleCategory.length) {
                this.props.dispatch(Actions.getCategories({
                    type: `GetArticleCates/${page}/${limit}`,
                    params: {
                        type: 'articlesCategories',
                        screen: 'home'
                    }
                }));
            }
        }

        if (!this.props.homeRecent.length) {
            this.props.dispatch(Actions.getProducts({
                type: `GetNew/${page}/${proLimit}`,
                params: {
                    type: 'Recent',
                    page: page
                }
            }));
        }

        if(!this.props.isFetchingBestSelling) {
            if (!this.props.homeBestSelling.length) {
                this.props.dispatch(Actions.getProducts({
                    type: `GetBestSelling/${page}/${proLimit}`,
                    params: {
                        type: 'BestSelling',
                        page: page
                    }
                }));
            }
        }

        if (!this.props.homeSlides.length) {
            this.props.dispatch(Actions.getSliders());
        }
    }

    _showModal = (item) => {
        this.setState({item});
        this.setState({isModalVisible: !this.state.isModalVisible});
        this.props.navigation.dispatch(Actions.getProductDetail({id: item.pro_id}));
    };

    _submitModal = (state) => {
        if (state.proQuantity < 1) {
            return;
        }
        if (_.isEmpty(state.proColor) || _.isEmpty(state.proSize)) {
            Alert.alert(
                "Xảy ra lỗi",
                "Vui lòng chọn màu sắc và kích thước", [], {cancelable: true})
            return;
        }
        this.props.navigation.dispatch(Actions.addToCart({
            "product": state.product,
            "amount": state.proQuantity,
            "color": _.isEmpty(state.proColor) ? '' : state.proColor,
            "size": _.isEmpty(state.proSize) ? '' : state.proSize
        }));
        this._closeModal();
        Toast.show(translate("Thêm vào giỏ hàng thành công"));
    };
    _closeModal = () => {
        this.setState({isModalVisible: false});
        this.setState({amount: 0, note: ""});
    };

    _renderModalContent = () => (
        <ScrollView>
            {this.props.bIsFetchingProductDetail ? <ActivityIndicator animating size="large"/> :
                <View style={styles.modalContent}>
                    <View style={{alignItems: 'stretch', flex: 1, height: 150}}>
                        <FastImage
                            source={(this.props.productDetail.pro_main_image) ? {
                                uri: getImagePath(this.props.productDetail.pro_main_image),
                                priority: FastImage.priority.normal
                            } : require('../../../images/default.png')}
                            style={[styles.listItemImage, {width: 300, marginTop: 15, marginBottom: 15}]}
                            resizeMode={FastImage.resizeMode.contain}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{
                            textAlign: "left",
                            fontWeight: 'bold',
                            fontSize: 15,
                        }}>{this.props.productDetail.pro_name}</Text>
                        {this.props.productDetail.pro_is_sale_off !== false ?
                            <View style={{flexDirection: "row", flex: 1}}>
                                <Text
                                    style={styles.proNormalPrice}>{formatMoney(this.props.productDetail.pro_price, 0)}đ</Text>
                                <Text
                                    style={styles.proFinalPrice}>{formatMoney(this.props.productDetail.pro_price_after_sale_off, 0)}đ</Text>
                            </View> :
                            <Text
                                style={styles.proFinalPrice}>{formatMoney(this.props.productDetail.pro_price, 0)}đ</Text>
                        }
                    </View>
                    <ProductAttribute
                        productDetail={this.props.productDetail}
                        isModal={true}
                        submitModal={(state) => this._submitModal(state)}
                        closeModal={() => this._closeModal()}
                        dispatch={this.props.dispatch}
                    />
                </View>}
        </ScrollView>
    );

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isReady: true
            }, () => this._fetchData());
        });
    }

    onPressTab = (tab) => {
        if (tab === 'recent') {
            this.setState({
                tabRecent: 1,
                tabBestSelling: 0
            })
        } else {
            this.setState({
                tabRecent: 0,
                tabBestSelling: 1
            })
        }
    }

    render() {
        if(!this.state.isReady){
            return <ActivityIndicator />
        }
        let {tabRecent, tabBestSelling} = this.state;
        return (
            <View style={styles.container}>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <ScrollView style={styles.body}>
                    {this.renderSlider()}
                    {this.renderCategories()}
                    <View style={styles.tabBar}>
                        <View style={[styles.tabBarLineButton, tabRecent === 1 ? styles.whenActive : null]}>
                            <Text onPress={() => {
                                this.onPressTab('recent')
                            }} style={[styles.tabBarButton, tabRecent === 1 ? styles.whenActiveColor : null]}>MỚI
                                NHẤT</Text>
                        </View>
                        <View style={[styles.tabBarLineButton, tabBestSelling === 1 ? styles.whenActive : null]}>
                            <Text onPress={() => {
                                this.onPressTab('bestSelling')
                            }} style={[styles.tabBarButton, tabBestSelling === 1 ? styles.whenActiveColor : null]}>BÁN
                                CHẠY</Text>
                        </View>
                    </View>
                    {this.props.isFetchingRecent === true && this.props.isFetchingBestSelling === true ? null
                        :
                        <View>
                            <View style={{flex: 1}}>
                                <Modal
                                    isVisible={this.state.isModalVisible}
                                    onBackdropPress={this._closeModal}
                                    backdropOpacity={0.4}
                                >
                                    {this._renderModalContent()}
                                </Modal>
                            </View>
                            {this.state.tabRecent === 1 ? this.renderRecents() : null}
                            {this.state.tabBestSelling === 1 ? this.renderBestSelling() : null}
                        </View>
                    }
                    {this.renderArticleCategory()}
                    {this.renderArticles()}
                </ScrollView>
            </View>
        );
    }

    renderRecents = () => {
        let {homeRecent} = this.props;
        return (
            <Products data={homeRecent} dispatch={this.props.dispatch} showModal={(item) => this._showModal(item)}
                      homeSearch="New"/>
        );
    };

    renderBestSelling = () => {
        let {homeBestSelling} = this.props;
        return (
            <Products data={homeBestSelling} dispatch={this.props.dispatch} showModal={(item) => this._showModal(item)}
                      homeSearch="BestSelling"/>
        )
    };

    renderHeaderSearch = () => {
        return (
            <HeaderSearch/>
        )
    };

    renderSlider = () => {
        let {homeSlides} = this.props;
        return (
            this.props.isFetchingSliders ? null : <Slider data={homeSlides} dispatch={this.props.dispatch}/>
        )
    };

    renderCategories() {
        let categories = this.props.homeProductCategories;
        if (categories.length) {
            return (
                <CategoryList key={'categories'} aCategories={categories} dispatch={this.props.dispatch}
                              isFetching={this.props.isFetchingCategories} pageName="home"/>
            )
        }
        return null;

    }

    renderArticles() {
        let {articlesListing} = this.props;
        return (
            this.props.isFetchingArticlesListing ?
                <View style={{height: 400, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={colors.main}/>
                </View> :
                <Articles artcate={this.state.artActiveId} data={articlesListing} dispatch={this.props.dispatch}/>
        )
    }

    renderArticleCategory() {
        let {articleCategory} = this.props;
        return (
            this.props.isFetchingArticlesCategories ? null :
                <ArticlesCategory onSelect={(artCateId) => this.setState({artActiveId: artCateId})}
                                  dispatch={this.props.dispatch} pageName="home" data={articleCategory}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        homeRecent: state.product.homeRecent.items,
        isFetchingRecent: state.product.homeRecent.isFetching,
        homeBestSelling: state.product.homeBestSelling.items,
        isFetchingBestSelling: state.product.homeBestSelling.isFetching,
        homeProductCategories: state.category.homeProductCategories,
        isFetchingCategories: state.category.isFetching,
        homeSlides: state.product.homeSliders.sliders,
        isFetchingSliders: state.product.homeSliders.isFetching,
        articlesListing: state.article.articlesListing,
        isFetchingArticlesListing: state.article.isFetchingArticlesListing,
        articleCategory: state.category.articlesCategories,
        isFetchingArticlesCategories: state.category.isFetching,
        productDetail: state.product.productDetail.item,
        bIsFetchingProductDetail: state.product.productDetail.isFetching
    }
}

export default connect(mapStateToProps, null)(connectAlert(Home));
