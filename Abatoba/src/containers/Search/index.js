import React, {Component} from 'react';
import {
    Platform, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, BackHandler, Alert
} from 'react-native';
import {connect} from "react-redux";
import * as Actions from "../../actions";
import styles from './styles';
import HeaderSearch from '../HeaderSearch';
import StatusBarBackground from '../../components/StatusBarBackground';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getImagePath from "../../services/getImagePath";
import FastImage from "react-native-fast-image";
import {translate} from "../../languages/locale";
import {formatMoney} from "../../services/format";
import modalStyles from "../Home/Home/styles";
import Modal from "react-native-modal";
import Toast from "react-native-simple-toast";
import _ from 'lodash';
import Spinner from "react-native-loading-spinner-overlay";
import ProductAttribute from "../../components/Products/Attributes";
import Products from "../../components/Products";

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            limit: 12,
            refreshing: false,
            proQuantity: 0,
            isModalVisible: false
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    static navigationOptions = ({navigation}) => {
        return {
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
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
    }
    
    componentWillUnmount() {
        this.props.navigation.dispatch(Actions.clearSearchKeywords({}));
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentDidMount() {
    }
    
    componentDidUpdate() {
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            keywords: nextProps.lstSearchProduct.params.keywords || ''
        })
    }
    
    _fetchData() {
        // let limit = 9999, page = 1;
        // this.props.dispatch(Actions.getCategories({type: `GetProductCates/${page}/${limit}`}));
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
                            priority: FastImage.priority.high
                        } : require('../../images/default.png')}
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
    renderHeaderSearch = () => {
        return (
            <HeaderSearch isSearchPage={true} hasBack={true}/>
        )
    };
    
    renderProductItemList(products) {
        return (
            <Products data={products} dispatch={this.props.dispatch} view="list" page="detail"
                      showModal={(item) => this._showModal(item)}/>
        );
    }
    
    _loadMore() {
        let page = Math.ceil(this.props.items.length / this.state.limit) + 1;
        if (this.props.lstSearchProduct.params.keywords !== '') {
            if (!this.props.isFetching)
                this.props.navigation.dispatch(Actions.doSearch({
                    ...this.state,
                    keywords: this.props.lstSearchProduct.params.keywords,
                    page: page
                }));
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <ScrollView style={styles.body}>
                    {_.isEmpty(this.props.items) ?
                        this.props.isSearchFetching !== true ?
                            <Spinner visible={this.props.isSearchFetching} color="#0074D9"/> :
                            <Text style={{padding: 10, textAlign: 'center'}}>Không tìm thấy sản phẩm nào.</Text>
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
                                {this.renderProductItemList(this.props.items)}
                                {!this.props.lstSearchProduct.isEnd ?
                                    <View style={[styles.formgroupWapper, styles.formButton]}>
                                        <TouchableOpacity style={styles.updateInfoButton}
                                                          onPress={() => this._loadMore()}>
                                            <Text style={styles.registerText}>{'Xem thêm'.toUpperCase()}</Text>
                                        </TouchableOpacity>
                                    </View> : null}
                            
                            </View>
                        </View>}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({product}) {
    return {
        lstSearchProduct: product.lstSearchProduct,
        items: product.lstSearchProduct.items,
        isSearchFetching: product.lstSearchProduct.isFetching,
        productDetail: product.productDetail.item,
        isFetchingDetail: product.productDetail.isFetching
    }
}

export default connect(mapStateToProps, null)(Search);
