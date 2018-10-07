import React, {Component} from "react";
import {
    Button,
    Image,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
    BackHandler,
    ActivityIndicator,
    Alert,
    RefreshControl
} from "react-native";
import styles from "./styles";
import {connect} from "react-redux";
import {connectAlert} from "../../../components/alertDropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Actions from "../../../actions";
import getImagePath from "../../../services/getImagePath";
import {translate} from "../../../languages/locale";
import CategoryList from "../../../components/CategoryList";
import HeaderSearch from "../../HeaderSearch";
import StatusBarBackground from "../../../components/StatusBarBackground";
import Products from "../../../components/Products";
import _ from "lodash";
import FastImage from "react-native-fast-image";
import {formatMoney} from "../../../services/format";
import Spinner from "react-native-loading-spinner-overlay";
import modalStyles from "./../Home/styles";
import Toast from "react-native-simple-toast";
import Modal from "react-native-modal";
import ProductAttribute from "./../../../components/Products/Attributes";

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            refreshing: false,
            proQuantity: 0,
            isModalVisible: false,
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
            header: null
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._fetchData();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.dispatch(Actions.clearCategoryProduct());
    }

    componentDidMount() {
    }

    renderHeaderSearch = () => {
        return (
            <HeaderSearch hasBack={true}/>
        )
    }

    renderCategories() {
        let childs = this.props.navigation.state.params.category.cate_childs
        if (!!childs) {
            return null;
        }
        return (
            <CategoryList aCategories={childs} dispatch={this.props.dispatch}
                          isFetching={this.props.isFetchingCategories} pageName="child"/>
        )
    }

    _fetchData() {
        let category = this.props.navigation.state.params.category,
            page = 1,
            limit = 10;
        this.props.dispatch(Actions.getProducts({
            type: `Get/${page}/${limit}/${category.cate_id}`,
            params: {
                page: page,
            }
        }))
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
        if (!state.proColor.length || !state.proSize.length) {
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
            {this.props.isFetchingDetail ? <ActivityIndicator animating size="large"/> :
                <View style={modalStyles.modalContent}>
                    <View style={{alignItems: 'stretch', flex: 1, height: 150}}>
                        <FastImage source={(this.props.productDetail.pro_main_image) ? {
                                uri: getImagePath(this.props.productDetail.pro_main_image),
                                priority: FastImage.priority.normal
                            } : require('../../../images/default.png')} style={[styles.listItemImage, {width: 300,marginTop:15,marginBottom:15}]}
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
                    <ProductAttribute
                        productDetail={this.props.productDetail}
                        isModal={true}
                        submitModal={(state)=> this._submitModal(state)}
                        closeModal={()=>this._closeModal()}
                        dispatch={this.props.dispatch}
                    />
                </View>}
        </ScrollView>
    );
    renderRecent = () => {
        let products = this.props.aProducts
        return (
            <View style={[styles.container, {marginTop: 5}]}>
                {_.isEmpty(products) ?
                    this.props.isFetchingProducts === true ? <Spinner visible={this.props.isFetchingProducts} color="#0074D9"/> : <Text style={{textAlign: 'center'}}>Không có sản phẩm nào trong danh mục</Text>
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
                        <Products data={products} dispatch={this.props.dispatch} view="list" page="detail" showModal={(item) => this._showModal(item)}/>
                    </View>
                }
            </View>
        )
    }
    _loadMoreProducts() {
        if (!this.props.isEndProducts) {
            let category = this.props.navigation.state.params.category,
                page = this.props.iPage ? this.props.iPage + 1 : 1,
                limit =10;
            this.props.dispatch(Actions.getProducts({
                type: `Get/${page}/${limit}/${category.cate_id}`,
                params: {
                    page: page,
                }
            }))
        }
    }
    renderFooter = () => {
        return (
            <View style={{paddingBottom: 40}}/>
        )
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    onScroll={({nativeEvent}) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this._loadMoreProducts();
                        }
                    }}
                >
                    {this.renderCategories()}
                    {this.renderRecent()}
                    {this.renderFooter()}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps({nav, auth, product, category}) {
     all_list = product.all_lstProduct;
    if (all_list.length) {
        lstProduct = all_list.slice(-1)[0];
    } else {
        lstProduct = product.lstProduct;
    }
    return {
        aCategories: category.aCategories,
        isFetchingCategories: category.isFetching,
        aProducts: lstProduct.items,
        iPage: lstProduct.params.page,
        isFetchingProducts: lstProduct.isFetching ,
        isEndProducts: lstProduct.isEnd ,
        productDetail: product.productDetail.item,
        isFetchingDetail: product.productDetail.isFetching
    }
}

export default connect(mapStateToProps, null)(connectAlert(CategoryDetail));
