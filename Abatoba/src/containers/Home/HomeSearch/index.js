import React, {Component} from 'react';
import {
    Button, Platform, Image, Text, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator, BackHandler, Alert
} from 'react-native';
import {connect} from "react-redux";
import * as Actions from "../../../actions";
import styles from './styles';
import HeaderSearch from '../../HeaderSearch';
import StatusBarBackground from '../../../components/StatusBarBackground';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getImagePath from "../../../services/getImagePath";
import FastImage from "react-native-fast-image";
import {translate} from "../../../languages/locale";
import {formatMoney} from "../../../services/format";
import modalStyles from "../Home/../Home/styles";
import Modal from "react-native-modal";
import Toast from "react-native-simple-toast";
import _ from 'lodash';
import Spinner from "react-native-loading-spinner-overlay";
import ProductAttribute from "../../../components/Products/Attributes";
import Products from "../../../components/Products";

class HomeSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            proQuantity: 0,
            isModalVisible: false,
            searchType: this.props.navigation.state.params.homeSearchType === 'New' ? 'Recent' : this.props.navigation.state.params.homeSearchType
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
            header: null
        }
    };

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._fetchData();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.dispatch(Actions.clearSearchAllProduct({
            params: {
                type: this.state.searchType === 'New' ? 'Recent' : this.state.searchType
            }
        }));
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    _fetchData() {
        let type = this.props.navigation.state.params.homeSearchType,
            page = this.props[`iPageAll${this.state.searchType}`] ? this.props[`iPageAll${this.state.searchType}`] + 1 : 1,
            limit = 10;
        this.props.dispatch(Actions.getProducts({
            type: `Get${type}/${page}/${limit}`,
            params: {
                type: type === 'New' ? "AllRecent" : `All${type}`,
                page: page
            }
        }))
    }

    _showModal(item) {
        console.log("show modal");
        this.setState({item});
        this.setState({isModalVisible: !this.state.isModalVisible});
        this.props.navigation.dispatch(Actions.getProductDetail({id: item.pro_id}));
    };

    _submitModal(state) {
        if (state.proQuantity < 1) {
            return;
        }
        if (!state.proColor.length || !state.proSize.length) {
            Alert.alert(
                "Xảy ra lỗi",
                "Vui lòng chọn màu sắc và kích thước", [], {cancelable: true})
            return;
        }
        this.props.navigation.dispatch(Actions.addToCart({
            "product": state.product,
            "amount": state.proQuantity,
            "color": state.proColor,
            "size": state.proSize
        }));
        this._closeModal();
        Toast.show(translate("Thêm vào giỏ hàng thành công"));
    };

    _closeModal() {
        this.setState({isModalVisible: false});
        this.setState({amount: 0, note: ""});
    };

    _renderModalContent = () => (
        <ScrollView>
            {this.props.isFetchingDetail ? <ActivityIndicator animating size="large"/> :
                <View style={modalStyles.modalContent}>
                    <View style={{alignItems: 'stretch', flex: 1, height: 150}}>
                        <FastImage source={(this.props.productDetail.pro_main_image) ? {
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
                                    style={modalStyles.proNormalPrice}>{formatMoney(this.props.productDetail.pro_price, 0)}đ</Text>
                                <Text
                                    style={modalStyles.proFinalPrice}>{formatMoney(this.props.productDetail.pro_price_after_sale_off, 0)}đ</Text>
                            </View> :
                            <Text
                                style={modalStyles.proFinalPrice}>{formatMoney(this.props.productDetail.pro_price, 0)}đ</Text>
                        }
                    </View>
                    {!_.isEmpty(this.props.productDetail) ? <ProductAttribute
                        productDetail={this.props.productDetail}
                        isModal={true}
                        submitModal={(state) => this._submitModal(state)}
                        closeModal={() => this._closeModal()}
                        dispatch={this.props.dispatch}
                    /> : null}

                </View>}
        </ScrollView>
    );

    _loadMoreProducts() {
        if (!this.props[`iEndAll${this.state.searchType}`]) {
            this._fetchData();
        }
    }

    renderHeaderSearch = () => {
        return (
            <HeaderSearch isSearchPage={true} hasBack={true}/>
        )
    };

    renderProductItemList() {
        let products = this.props[`homeAll${this.state.searchType}`]
        return (
            <Products data={products} dispatch={this.props.dispatch} view="list" page="detail"
                      showModal={(item) => this._showModal(item)}/>
        );
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <ScrollView
                    style={styles.body}
                    onScroll={({nativeEvent}) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this._loadMoreProducts();
                        }
                    }}
                >
                    <View style={styles.tabBar}>
                        <Text
                            style={styles.proRelatedLabel}>{this.state.searchType === 'Recent' ? 'Sản phẩm mới nhất' : 'Sản phẩm bán chạy'}</Text>
                    </View>
                    {_.isEmpty(this.props[`homeAll${this.state.searchType}`]) ?
                        this.props[`isFetchingAll${this.state.searchType}`] === true ?
                            <Spinner visible={this.props[`isFetchingAll${this.state.searchType}`]} color="#0074D9"/> :
                            <Text style={{textAlign: 'center'}}>Không tìm thấy sản phẩm nào</Text>
                        :
                        <View>
                            <View style={{flex: 1}}>
                                <Modal
                                    isVisible={this.state.isModalVisible}
                                    onBackdropPress={() => this._closeModal()}
                                    backdropOpacity={0.4}
                                >
                                    {this._renderModalContent()}
                                </Modal>
                            </View>
                            {this.renderProductItemList()}
                        </View>}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({product}) {
    return {
        lstProduct: product.lstSearchProduct,
        items: product.lstSearchProduct.items,
        isFetching: product.lstSearchProduct.isFetching,
        homeAllRecent: product.homeAllRecent.items,
        isFetchingAllRecent: product.homeAllRecent.isFetching,
        iPageAllRecent: product.homeAllRecent.params.page,
        iEndAllRecent: product.homeAllRecent.params.isEnd,
        homeAllBestSelling: product.homeAllBestSelling.items,
        isFetchingAllBestSelling: product.homeAllBestSelling.isFetching,
        iPageAllBestSelling: product.homeAllBestSelling.params.page,
        iEndAllBestSelling: product.homeAllBestSelling.params.isEnd,
        productDetail: product.productDetail.item,
        isFetchingDetail: product.productDetail.isFetching
    }
}

export default connect(mapStateToProps, null)(HomeSearch);
