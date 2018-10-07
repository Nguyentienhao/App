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
    RefreshControl,
    Alert,
    Platform,
    TouchableHighlight,
    ActivityIndicator
} from "react-native";
import {connect} from "react-redux";
import {connectAlert} from "../../../components/alertDropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import {translate} from "../../../languages/locale";
import Products from "./../../../components/Products";
import StatusBarBackground from "../../../components/StatusBarBackground";
import styles from "./styles";
import modalStyles from "./../Home/styles";
import HeaderSearch from "../../HeaderSearch";
import ProductAttribute from "./../../../components/Products/Attributes";
import Toast from "react-native-simple-toast";
import Modal from "react-native-modal";
import _ from "lodash";
import Spinner from "react-native-loading-spinner-overlay";
import * as Actions from "../../../actions";
import {getProductDetail, getProducts} from "../../../actions";
import FastImage from "react-native-fast-image";
import {formatMoney} from "../../../services/format";
import getImagePath from "../../../services/getImagePath";
import Swiper from "react-native-swiper";
import sliderStyles from "./../../../components/Slider/styles";
import HTMLView from "react-native-htmlview";

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            refreshing: false,
            proQuantity: 0,
            isModalVisible: false,
            idProduct: this.props.productDetail.pro_id || '',
            amount: 1,
            selectedColorIndex: 0,
            note: "",
            item: {},
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
                    name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            swipeEnabled: false,
            headerStyle: {
                backgroundColor: '#fff',
                borderWidth: 0,
                borderBottomColor: '#fff'
            },
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        let pro_id = this.props.navigation.state.params.id, page = 1, proLimit = 5;
        let payload = {
            "id": pro_id,
        };
        this.props.navigation.dispatch(getProductDetail(payload));
        if (!this.props.isFetchingDetail) {
            this.props.navigation.dispatch(getProducts({
                type: `GetRelated/${page}/${proLimit}/${pro_id}`,
                params: {
                    type: 'Related',
                    page: page
                }
            }))
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if (!nextProps.isFetchingDetail && nextProps.productDetail.pro_id !== this.state.idProduct) {
            let pro_id = nextProps.productDetail.pro_id, page = 1, proLimit = 5;
            this.props.navigation.dispatch(getProducts({
                type: `GetRelated/${page}/${proLimit}/${pro_id}`,
                params: {
                    type: 'Related'
                }
            }))
        }
        console.log('componentWillUpdate', nextState);
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            idProduct: nextProps.productDetail.pro_id || ''
        })
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.dispatch(Actions.clearProduct());
    }

    componentDidMount() {
    }
    _showModal = (item) => {
        this.setState({item});
        this.setState({isModalVisible: !this.state.isModalVisible});
        this.props.navigation.dispatch(Actions.getProductDetail({id: item.pro_id, type: 'RelatedDetail'}));
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
            {this.props.isFetchingProductRelatedDetail ? <ActivityIndicator animating size="large"/> :
                <View style={modalStyles.modalContent}>
                    <View style={{alignItems: 'stretch', flex: 1, height: 150}}>
                        <FastImage source={(this.props.productRelatedDetail.pro_main_image) ? {
                                uri: getImagePath(this.props.productRelatedDetail.pro_main_image),
                                priority: FastImage.priority.high
                            } : require('../../../images/default.png')} style={[styles.listItemImage, {width: 300,marginTop:15,marginBottom:15}]}
                                   resizeMode={'cover'}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{
                            textAlign: "left",
                            fontWeight: 'bold',
                            fontSize: 15,
                        }}>{this.props.productRelatedDetail.pro_name}</Text>
                        {this.props.productRelatedDetail.pro_is_sale_off !== false ?
                            <View style={{flexDirection: "row", flex: 1}}>
                                <Text
                                    style={modalStyles.proNormalPrice}>{formatMoney(this.props.productRelatedDetail.pro_price, 0)}đ</Text>
                                <Text
                                    style={modalStyles.proFinalPrice}>{formatMoney(this.props.productRelatedDetail.pro_price_after_sale_off, 0)}đ</Text>
                            </View> :
                            <Text
                                style={modalStyles.proFinalPrice}>{formatMoney(this.props.productRelatedDetail.pro_price, 0)}đ</Text>
                        }
                    </View>
                    <ProductAttribute
                        productDetail={this.props.productRelatedDetail}
                        isModal={true}
                        submitModal={(state)=> this._submitModal(state)}
                        closeModal={()=>this._closeModal()}
                        dispatch={this.props.dispatch}
                    />
                </View>}
        </ScrollView>
    );

    renderRelated() {
        let relatedPro = this.props.productsRelated
        return (
            _.isEmpty(relatedPro) ? null :
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
                    <View style={styles.tabBar}>
                        <Text style={styles.proRelatedLabel}>Sản phẩm liên quan</Text>
                    </View>
                    <Products data={relatedPro} dispatch={this.props.dispatch} view="list" page="detail" showModal={(item) => this._showModal(item)}/>
                </View>
        )
    }
    render() {
        let product = this.props.productDetail
        return (
            <View style={styles.container}>
                <StatusBarBackground />
                <HeaderSearch hasBack={true}/>
                <ScrollView style={styles.body}>
                    {_.isEmpty(product) ?
                        <Spinner visible={this.props.isFetchingDetail} color="#0074D9"/> :
                        <View>
                            {this.renderSlider()}
                            {this.renderTitle()}
                            {this.renderAttribute()}
                            {_.isEmpty(product.pro_describe) ? null :
                                <View style={styles.proBlock}>
                                    <HTMLView value={product.pro_describe}/>
                                </View>
                            }
                            {this.renderRelated()}
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }
    renderSlider = () => {
        let slides = this.props.productDetail.pro_colors;
        return (
            slides.length ?
            <Swiper
                ref={(swiper) => {this._swiper = swiper}}
                style={sliderStyles.wrapper}
                dot={<View style={sliderStyles.slideDot}/>}
                activeDot={<View style={sliderStyles.dotActive}/>}
                paginationStyle={sliderStyles.slidePagination}
                autoplay={false}
                loop={true}
                onIndexChanged={(index) => this.setState({
                    selectedColorIndex: index
                })}>
                {slides.map((slide, index) => (
                    <View key={index} style={sliderStyles.slide}>
                        <FastImage
                            style={sliderStyles.slideImage}
                            source={{uri: `${slide.sli_image}`,priority: FastImage.priority.normal}}
                            resizeMode={FastImage.resizeMode.contain}/>
                    </View>
                ))}
            </Swiper>
            : null
        )
    }
    _changeSelectedIndex = (index) => {
        let currentIndex = this.state.selectedColorIndex;
        console.log('currentIndex', currentIndex)
        if(currentIndex !== index) {
            let resultSlide = undefined;
            let countSlides = this.props.productDetail.pro_colors.length;

            if(index > currentIndex && index !== countSlides)
            {
                resultSlide = index - currentIndex;
                this._swiper.scrollBy(resultSlide, true);
            }
            else if(index>currentIndex && index === countSlides)
            {
                resultSlide = currentIndex+1;
                this._swiper.scrollBy(resultSlide, true);
            }
            else if(index < currentIndex && index !== 0){
                resultSlide = (currentIndex - index) * (-1);
                this._swiper.scrollBy(resultSlide, true);
            }
            else if(index < currentIndex && index === 0){
                resultSlide = currentIndex * (-1);
                this._swiper.scrollBy(resultSlide, true);

            }
            console.log('resultSlide', resultSlide);
        }
    }
    renderTitle = () => {
        let product = this.props.productDetail;
        return (
            <View style={styles.proBlock}>
                <Text style={styles.proName}>{product.pro_name}</Text>
                <View style={styles.proPriceHolder}>
                    <Text style={styles.proId}>ID: {product.pro_id}</Text>
                    {product.pro_is_sale_off == false ?
                        <Text style={styles.proFinalPrice}>{product.pro_price.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ</Text> :
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.proNormalPrice}>{product.pro_price.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ</Text>
                            <Text style={styles.proFinalPrice}>{product.pro_price_after_sale_off.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
    renderAttribute = () => {
        return (
            <ProductAttribute productDetail={this.props.productDetail} dispatch={this.props.dispatch} selectedAction={(index) => this._changeSelectedIndex(index)}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        productDetail: state.product.productDetail.items.length ? state.product.productDetail.items.slice(-1)[0] : {},
        isFetchingDetail: state.product.productDetail.isFetching,
        productsRelated: state.product.homeRelated.items,
        isFetchingRelated: state.product.homeRelated.isFetching,
        productRelatedDetail: state.product.productRelatedDetail.item,
        isFetchingProductRelatedDetail: state.product.productRelatedDetail.isFetching
    }
}

export default connect(mapStateToProps, null)(connectAlert(ProductDetail));