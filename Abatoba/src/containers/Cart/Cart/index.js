import React, {Component} from "react";
import {
    Button,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
    TextInput,
    Alert,
    BackHandler
} from "react-native";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Actions from "../../../actions";
import * as Constants from "../../../configs/constants";
import {jumpTo} from "../../../actions";
import styles from "./styles";
import HeaderSearch from "../../HeaderSearch";
import Products from "../../../components/Products";
import _ from "lodash";
import {RadioGroup, RadioButton} from "react-native-flexi-radio-button";
import StatusBarBackground from "../../../components/StatusBarBackground";
import Material from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-simple-toast";
import {connectAlert} from "../../../components/alertDropdown";
import {formatMoney} from "../../../services/format";
import {translate} from "../../../languages/locale";
import colors from '../../../configs/colors';
class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyType: '1', //1 tai cua hang, 2 online
            payType: '1', //1 atm, 2 tien mat
            saleOffId: '',
            note: '',
            whichInput: '',
            discount: 0,
            placeOrder: false,
            totalPrice: this.props.cartTotalPrice,
            priceAfterDiscount: this.props.cartTotalPrice,
            cartDetail: this.props.cartDetail
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-basket' : 'md-basket'}
                    size={22}
                    style={{ color: tintColor }}
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }


    componentDidMount() {
    }

    componentDidUpdate() {

    }
    componentWillUpdate(nextProps) {
        if (this.state.saleOffId !== '' && nextProps.isValidateSaleOff === false
            && nextProps.isValidSaleOffId !== this.props.isValidSaleOffId) {
            if (nextProps.isValidSaleOffId === false) {
                if (this.props.isValidSaleOffId != true) {
                    Alert.alert(
                        "Xảy ra lỗi",
                        "Mã giảm giá không hợp lệ",[

                    ], { cancelable: true })
                    this.setState({
                        'priceAfterDiscount': nextProps.cartTotalPrice - this.state.discount
                    })
                    return;
                }
            } else {
                let saleOffInfo = nextProps.saleOffInfo,
                    cart = this.state.cartDetail,
                    isChange = false,
                    totalPrice = 0;
                if (typeof saleOffInfo !== 'undefined') {
                    if (saleOffInfo.saleoff_type == 2) {
                        cart.forEach(product => {
                            isChange = true;
                            if (product.pro_is_sale_off === false) {
                                _price = this._applySaleOff(product.pro_price, saleOffInfo.saleoff_decreases_value, saleOffInfo.saleoff_decreases_type);
                                totalPrice += (parseFloat(_price) * product.cart_amount)
                            } else {
                                _price = this._applySaleOff(product.pro_price_after_sale_off, saleOffInfo.saleoff_decreases_value, saleOffInfo.saleoff_decreases_type);
                                totalPrice += (parseFloat(_price) * product.cart_amount)
                            }
                        });
                    } else if (saleOffInfo.saleoff_type == 1) {
                        if (this.state.totalPrice >= saleOffInfo.saleoff_bill_value) {
                            isChange = true;
                            totalPrice = this._applySaleOff(this.state.totalPrice, saleOffInfo.saleoff_decreases_value, saleOffInfo.saleoff_decreases_type);
                        }
                    } else {
                        cart.forEach(product => {
                            if (saleOffInfo.list_product_ids.indexOf(product.pro_id) > -1) {
                                isChange = true;
                                if (product.pro_is_sale_off === false) {
                                    _price = this._applySaleOff(product.pro_price, saleOffInfo.saleoff_decreases_value, saleOffInfo.saleoff_decreases_type);
                                    totalPrice += (parseFloat(_price) * product.cart_amount)
                                } else {
                                    _price = this._applySaleOff(product.pro_price_after_sale_off, saleOffInfo.saleoff_decreases_value, saleOffInfo.saleoff_decreases_type);
                                    totalPrice += (parseFloat(_price) * product.cart_amount)
                                }
                            } else {
                                if (product.pro_is_sale_off === false) {
                                    totalPrice += (parseFloat(product.pro_price) * product.cart_amount)
                                } else {
                                    totalPrice += (parseFloat(product.pro_price_after_sale_off) * product.cart_amount)
                                }
                            }
                        });
                    }
                    if (isChange) {
                        this.setState({
                            'priceAfterDiscount': totalPrice - this.state.discount
                        })
                    } else {
                        this.setState({
                            'priceAfterDiscount': this.state.totalPrice - this.state.discount
                        })
                        Toast.show('Giỏ hàng không đủ điều kiện để được giảm giá');
                        return;
                    }
                }
            }
        }
    }
    componentWillUnmount() {

    }
    componentWillReceiveProps(props) {
        this.setState({
            cartDetail: props.cartDetail,
            totalPrice: props.cartTotalPrice,
        });
        if (this.state.totalPrice !== props.cartTotalPrice) {
            this.setState({
                priceAfterDiscount: props.cartTotalPrice,
                buyType: '1', //1 tai cua hang, 2 online
                payType: '1', //1 atm, 2 tien mat
                saleOffId: '',
                note: '',
                whichInput: '',
                discount: 0,
                placeOrder: false,
            });
        }
    }
    _applySaleOff (price,rate,type) {
        let newPrice = price;
        // %
        if (type == true) {
            newPrice = price - (price*rate)/100;
        } else {
            // price
            if (price < rate) {
                newPrice = 0;
            } else {
                newPrice = price - rate;
            }
        }
        return newPrice;
    }
    _removeItemFromCart(product) {
        this.props.dispatch(Actions.removeItemFromCart({product}));
        this._validateSaleOff();
    }
    _inputDiscountPrice() {
        this.setState({ priceAfterDiscount: this.state.totalPrice - this.state.discount });
        this._validateSaleOff();
    }
    _clearCart() {
        Alert.alert(
            translate('Xác nhận'),
            translate('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?'),
            [
                {text: translate('Cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: translate('Ok'), onPress: () => this.props.dispatch({type: Actions.CLEAR_CART})},
            ],
            { cancelable: false }
        );
    }
    _processOrder(saleOffInfo) {
        let order = {
            items: [],
            saleoff_id: this.state.saleOffId || '',
            note: this.state.note || '',
            order_at: this.state.buyType || 1,
            payments: this.state.payType || 1,
            address: this.props.oUser.address || '',
            bank_info: '',
            discount: this.state.discount,
            position: {
                lat: this.props.position.coords.latitude,
                lng: this.props.position.coords.longitude
            }, 
        };
        //Caculator price
        let cart = this.state.cartDetail,
            totalPrice = 0;
        if (typeof saleOffInfo !== 'undefined') {
            if (saleOffInfo.saleoff_type == 2) {
                cart.forEach(product => {
                    if (product.pro_is_sale_off === false) {
                        _price = this._applySaleOff(product.pro_price, saleOffInfo.saleoff_decreases_value, saleOffInfo.saleoff_decreases_type);
                        totalPrice += (parseFloat(_price) * product.cart_amount)
                    } else {
                        _price = this._applySaleOff(product.pro_price_after_sale_off, saleOffInfo.saleoff_decreases_value, saleOffInfo.saleoff_decreases_type);
                        totalPrice += (parseFloat(product.pro_price_after_sale_off) * product.cart_amount)
                    }
                });
            }
            this.setState({
                'priceAfterDiscount': totalPrice - this.state.discount
            })
        }
        cart.forEach(product => {
            order.items.push({
                product_id: product.pro_id,
                quantity: product.cart_amount,
                color_hex: product.cart_color,
                size: product.cart_size
            })
        });
        this.props.dispatch(Actions.placeOrder({params: order}))
    }
    _placeOrder() {
        if(this.props.isPlacingOrder) {
            return;
        }
        if (_.isEmpty(this.state.saleOffId) || this.props.isValidSaleOffId) {
            this._processOrder();
        } else {
            this.props.dispatch(Actions.validateSaleOf({id: this.state.saleOffId}));
        }
    }
    _validateSaleOff() {
        if (!_.isEmpty(this.state.saleOffId)) {
            this.props.dispatch(Actions.validateSaleOf({id: this.state.saleOffId}));
        }
    }
    renderFooter() {
        return (
            <View style={{paddingBottom: 40}}/>
        )
    }
    renderHeaderSearch = () => {
        return (
            <HeaderSearch/>
        )
    }
    renderItemsInCart = () => {
        let products = this.state.cartDetail
        return (
            <View style={styles.container}>
                {_.isEmpty(products) ?
                    <Text style={{textAlign: 'center',padding: 10}}>Không có sản phẩm nào trong giỏ hàng</Text>
                    :
                    <View>
                        <Products data={products} dispatch={this.props.dispatch} view="list" page="cart" removeFromCart={(item) => this._removeItemFromCart(item)}/>
                        <View style={styles.cartHeader}>
                            <Text style={{color: '#74726D'}}>TỔNG CỘNG:</Text>
                            <Text style={{fontSize:16}}>{formatMoney(this.state.totalPrice, 0)}đ</Text>
                        </View>
                    </View>
                }
            </View>
        )
    }

    renderPayment = () => {
        return (
            <View>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    borderTopWidth: 1.5,
                    borderTopColor: 'rgba(204, 204, 204, 1)',
                }}>
                    <View style={styles.cartPaymentHolder}>
                        <Text style={[styles.cartHeaderText, {marginTop: 10, marginBottom:10}]}>Mua hàng tại</Text>
                        <View>
                            <RadioGroup
                                activeColor={colors.main}
                                color={"#757575"}
                                selectedIndex={0}
                                onSelect = {(index, value) => {
                                    this.setState({
                                        buyType: value
                                    })
                                }}
                            >
                                <RadioButton value={'1'} >
                                    <Text style={{paddingLeft:20}}>Mua hàng tại cửa hàng</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text style={{paddingLeft:20, marginBottom: 10}}>Mua online</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    borderTopWidth: 1.5,
                    borderTopColor: 'rgba(204, 204, 204, 1)',
                }}>
                    <View style={styles.cartPaymentHolder}>
                        <Text style={[styles.cartHeaderText, {marginTop: 10, marginBottom:10}]}>Hình thức thanh toán</Text>
                        <View>
                            <RadioGroup
                                activeColor={colors.main}
                                color={"#757575"}
                                selectedIndex={0}
                                onSelect = {(index, value) => {
                                    this.setState({
                                        payType: value
                                    })
                                }}
                                style={styles.cartRadioHolder}
                            >
                                <RadioButton value={'1'} style={{
                                    alignItems: 'center',
                                }}>
                                    <Text style={{paddingLeft:20}}>ATM</Text>
                                </RadioButton>
                                <RadioButton value={'2'} style={{
                                    alignItems: 'center',
                                }}>
                                    <Text style={{paddingLeft:20}}>Tiền mặt</Text>
                                </RadioButton>
                                <RadioButton value={'3'} style={{
                                    alignItems: 'center',
                                }}>
                                    <Text style={{paddingLeft:20}}>TKNH</Text>
                                </RadioButton>
                            </RadioGroup>
                            <View style={styles.cartInput}>
                                {this.renderInputDiscount()}
                                <View style={styles.inputSection}>
                                    <Material
                                        name="local-activity"
                                        size={24}
                                        style={styles.iconInput}
                                    />
                                    <TextInput
                                        onFocus={() => {
                                            this.setState({whichInput:'coupon'});
                                        }}
                                        onBlur={() => {
                                            this.setState({whichInput:''});
                                            this._validateSaleOff();
                                        }}
                                        onChangeText={(code) => this.setState({
                                            saleOffId: code
                                        })}
                                        style={[this.state.whichInput === 'coupon' ? {borderBottomColor: colors.main} : null, styles.userInput]}
                                        placeholder={'Mã giảm giá'}
                                        autoCapitalize='none'
                                    />
                                </View>
                                <View style={styles.inputSection}>
                                    <Material
                                        name="subject"
                                        size={24}
                                        style={styles.iconInput}
                                    />
                                    <TextInput
                                        onFocus={() => {
                                            this.setState({whichInput:'note'});
                                        }}
                                        onBlur={() => {
                                            this.setState({whichInput:''});
                                        }}
                                        onChangeText={(note) => this.setState({
                                            note: note
                                        })}
                                        style={[this.state.whichInput === 'note' ? {borderBottomColor: colors.main} : null, styles.userInput]}
                                        placeholder={'Ghi chú'}
                                        autoCapitalize='none'
                                    />
                                </View>
                            </View>
                            <View style={styles.cartHeader}>
                                <Text style={{color: '#74726D'}}>TỔNG GIÁ SAU GIẢM:</Text>
                                <Text style={{fontSize:16}}>{formatMoney(this.state.priceAfterDiscount, 0)}đ</Text>
                            </View>
                            {this.renderButtonPlaceOrder()}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    renderInputDiscount(){
        console.log(this.props.oUser);
        if(!_.isEmpty(this.props.oUser) && this.props.oUser.group_id == Constants.USER_TYPE_STAFF){
            return (
                <View style={styles.inputSection}>
                    <Material
                        name="attach-money"
                        size={24}
                        style={styles.iconInput}
                    />
                    <TextInput
                        keyboardType = 'numeric'
                        onFocus={() => {
                            this.setState({whichInput:'discount'});
                        }}
                        onBlur={() => {
                            this.setState({whichInput:''});
                            this._inputDiscountPrice();
                        }}
                        onChangeText={(discount) => this.setState({
                            discount: discount
                        })}
                        style={[this.state.whichInput === 'discount' ? {borderBottomColor: colors.main} : null, styles.userInput]}
                        placeholder={'Giảm giá'}
                        autoCapitalize='none'
                    />
                </View>
            )
        }else {
            return null;
        }
    }
    renderButtonPlaceOrder(){
        if(_.isEmpty(this.props.oUser)){
            return (
                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity onPress={()=>this.props.dispatch(jumpTo('Login', {},'Cart', 'Cart'))} style={styles.cartOrderButton}>
                        <Text style={styles.cartOrderButtonText}>{translate('Vui lòng đăng nhập để đặt hàng')}</Text>
                    </TouchableOpacity>
                </View>
            )
        }else {
            return (
                <TouchableOpacity style={styles.cartOrderButton} onPress={() => this._placeOrder()}>
                    <Text style={styles.cartOrderButtonText}>{this.props.isPlacingOrder ? 'ĐANG ĐẶT HÀNG' : 'XÁC NHẬN ĐẶT HÀNG'}</Text>
                </TouchableOpacity>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <ScrollView>
                    <View style={styles.cartHeader}>
                        <Text style={styles.cartHeaderText}>Sản phẩm trong giỏ hàng</Text>
                        {!_.isEmpty(this.state.cartDetail) ?
                            <TouchableOpacity style={styles.cartHeaderButtonHolder} onPress={() => this._clearCart()}>
                                <Text style={styles.cartHeaderButton}>XÓA TẤT CẢ</Text>
                            </TouchableOpacity> : null
                        }
                    </View>
                    <View style={{paddingHorizontal: 10}}>
                        {this.renderItemsInCart()}
                    </View>
                    {!_.isEmpty(this.state.cartDetail) ?
                        <View>
                            {this.renderPayment()}
                            {this.renderFooter()}
                        </View> : null
                    }
                </ScrollView>
            </View>
        )
    }
}
function _getOrdersFromCart(cart) {
    cart = Object.values(cart);
    let processedCart = {cartDetail: [], totalPrice: 0};
    var _image = null;
    cart.map(product => {
        let itemPro = product.product;
        if (itemPro.pro_colors.length) {
            itemPro.pro_colors.map(function(color){
                if (color.pro_collor_hex == product.color) {
                    _image = color.sli_image
                }
            })
        }
        let cart_item = {
            ...itemPro,
            toggle: true,
        };
        cart_item.cart_amount = product.amount;
        cart_item.cart_color = product.color;
        cart_item.cart_size = product.size;
        cart_item.cart_image = _image;
        if (itemPro.pro_is_sale_off === false) {
            processedCart.totalPrice += (parseFloat(itemPro.pro_price) * product.amount)
        } else {
            processedCart.totalPrice += (parseFloat(itemPro.pro_price_after_sale_off) * product.amount)
        }
        processedCart.cartDetail.push(cart_item);
    });
    return processedCart;
}
function mapStateToProps({auth, transaction}) {
    let processedCart = _getOrdersFromCart(transaction.currCart);
    return {
        oUser: auth.oUser,
        position: auth.position,
        cartDetail: processedCart.cartDetail,
        isPlacingOrder: transaction.isPlacingOrder,
        cartTotalPrice: processedCart.totalPrice,
        isValidateSaleOff: transaction.isValidateSaleOff,
        isValidSaleOffId: transaction.isValidSaleOffId,
        saleOffInfo: transaction.saleOffInfo,
        successOrder: transaction.successOrder
    }
}

export default connect(mapStateToProps, null)(connectAlert(Cart));
