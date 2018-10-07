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
    BackHandler,
    Picker,
    Item,
    WebView,
    Dimensions
} from "react-native";
import {connect} from "react-redux";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Actions from "../../../actions";
import styles from "./styles";
import ModalSelector from "react-native-modal-selector";
import HeaderSearch from "../../HeaderSearch";
import _ from "lodash";
import StatusBarBackground from "../../../components/StatusBarBackground";
import {connectAlert} from "../../../components/alertDropdown";
import {formatMoney} from "../../../services/format";
import Spinner from "react-native-loading-spinner-overlay";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class ProcessOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankName: '',
            user_bank_code: '',
            user_card_number: '',
            user_card_fullname: '',
            user_card_month: '',
            user_card_year: '',
            order_payment: this.props.paymentType,
            error_user_bank_code: false,
            error_user_card_number: false,
            error_user_card_fullname: false,
            error_user_card_month: false,
            error_user_card_year: false,
            otp: '',
            isViewTransDetailModal: true,
            error_otp: false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        this.props.dispatch(Actions.getAtmAccount({}));
        this.props.dispatch(Actions.getIbAccount({}));
    }

    componentDidUpdate() {

    }
    componentWillUpdate(nextProps) {
        console.log('componentWillUpdate', nextProps.isAuthSuccess, this.props.isAuthSuccess);
        if (nextProps.isAuthTransaction === false
            && nextProps.isAuthSuccess !== this.props.isAuthSuccess) {
            if (nextProps.isAuthSuccess != true) {
                Alert.alert(
                    "Xảy ra lỗi",
                    "Thanh toán không thành công! Vui lòng kiểm tra lại thông tin",[

                    ], { cancelable: true })
            } else {
                this.props.dispatch(Actions.getTransactionDetail({params: {
                    token: this.props.onlinePaymentData.Token
                }}));
            }
        }
        if (this.props.isDonePayment == null && ((!_.isEmpty(nextProps.atmCardInfo) && _.isEmpty(this.props.atmCardInfo)) || (!_.isEmpty(nextProps.ibCardInfo) && _.isEmpty(this.props.ibCardInfo)))) {
            if (this.props.paymentType == 1) {
                if (!_.isEmpty(nextProps.atmCardInfo) && nextProps.atmCardInfo.user_bank_code !== '') {
                    let auth = 'IB_BANK';
                    if (this.props.nlBankList.indexOf(nextProps.atmCardInfo.user_bank_code) > -1) {
                        auth = 'NL';
                    }
                    console.log('auth',nextProps.atmCardInfo.user_bank_code, auth)
                    //Submit payment
                    this.props.dispatch(Actions.onlinePayment({params :{...nextProps.atmCardInfo, ...this.props.successOrder,auth_site: auth}}));
                }
            } else {
                if (!_.isEmpty(nextProps.ibCardInfo) && nextProps.ibCardInfo.user_ib_bank_code !== '') {
                    let auth = 'IB_BANK';
                    if (this.props.nlBankList.indexOf(nextProps.ibCardInfo.user_ib_bank_code) > -1) {
                        auth = 'NL';
                    }
                    console.log('auth',nextProps.ibCardInfo.user_ib_bank_code, auth)
                    let ibInfo = {
                        user_bank_code: nextProps.ibCardInfo.user_ib_bank_code,
                        user_card_number: nextProps.ibCardInfo.user_ib_number,
                        user_card_fullname: nextProps.ibCardInfo.user_ib_fullname,
                        user_card_month: 12, //sample
                        user_card_year: 2030 //sample
                    }
                    //Submit payment
                    this.props.dispatch(Actions.onlinePayment({params :{...ibInfo, ...this.props.successOrder,auth_site: auth}}));
                }
            }
        }
    }
    viewTransDetail(transDetail) {
        return (
        <View style={{flex:1}}>
            <View style={{
                backgroundColor: '#80ec5f',
                padding: 10,
            }}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 14,
                    color: '#FFF',
                    textAlign: 'center'
                }}>Thanh toán thành công.</Text>
            </View>
            <WebView
                source={{uri: transDetail.return_url}}
                style={{height: ScreenHeight, width: ScreenWidth}}
            />
            <View style={[styles.formgroupWapper,styles.formButton, {marginBottom: 20}]}>
                <TouchableOpacity style={styles.submitButton} onPress={()=>{this.setState({isViewTransDetailModal: false});this.props.dispatch(Actions.jumpTo('Home'))}}>
                    <Text style={[styles.submitText,{paddingHorizontal: 10}]}>{'Tiếp Tục Mua Sắm'.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        //Payment not success
        if (!this.props.isAuthSuccess) {
            this.props.dispatch(Actions.cancelOrder({id: this.props.successOrder.order_id}));
        }
    }
    componentWillReceiveProps(props) {
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
    _focusNextField(nextField) {
        this.refs[nextField].focus();
    }
    _submitOnlinePayment() {
        console.log(this.state);
        let arrAtt = ['user_bank_code', 'user_card_number', 'user_card_fullname', 'user_card_month', 'user_card_year'],
            hasError = false;
        arrAtt.forEach((key) => {
            let error = {};
            if (this.state[key] === '') {
                error[`error_${key}`] = true;
                hasError = true;
            } else {
                error[`error_${key}`] = false;
            }
            this.setState(error);
        });
        if (!hasError) {
            let auth = 'IB_BANK';
            if (this.props.nlBankList.indexOf(this.state.user_bank_code) > -1) {
                auth = 'NL';
            }
            //Submit payment
            this.props.dispatch(Actions.onlinePayment({params :{...this.state, ...this.props.successOrder,auth_site: auth}}));
        }
    }
    _getYearList() {
        let currentYear = (new Date()).getFullYear(),
            yearList = [];
        for(var i = 0; i <= 15; i++) {
            yearList.push({
                key: (currentYear + i).toString().substr(-2),
                label: (currentYear + i).toString(),
            });
        }
        return yearList;
    }
    _submitAuthTransaction() {
        if (this.state.otp ===  '') {
            this.setState({
                error_otp: true
            })
        } else {
            this.setState({
                error_otp: false
            })
            this.props.dispatch(Actions.authenTransaction({params: {
                token: this.props.onlinePaymentData.Token,
                otp: this.state.otp,
                auth_url: this.props.onlinePaymentData.Auth_url,
            }}));
        }
    }
    renderOrderInfor(orderDetail) {
        return (
            <View>
                <View style={styles.cartHeader}>
                    <Text style={{color: '#74726D', fontSize: 18}}>Mã đơn hàng:</Text>
                    <Text style={{fontSize: 16}}>{orderDetail.order_id}</Text>
                </View>
                <View style={styles.cartHeader}>
                    <Text style={{color: '#74726D', fontSize: 18}}>Tổng giá:</Text>
                    <Text style={{fontSize: 16}}>{orderDetail.order_total_discount > 0 ? formatMoney(orderDetail.order_total_discount, 0) : formatMoney(orderDetail.order_total_money, 0)}đ</Text>
                </View>
            </View>
        );
    }
    renderConfirmCode() {
        let onlineData = this.props.onlinePaymentData,
            orderDetail = this.props.successOrder;
        if (onlineData.Auth_site == 'NL') {
            return (
                <View>
                    {this.props.isAuthSuccess ?
                        <View>
                            <View style={{
                                backgroundColor: '#80ec5f',
                                padding: 10,
                                marginBottom: 15,
                            }}>
                                <Text style={{
                                    fontWeight: '500',
                                    fontSize: 14,
                                    color: '#FFF'
                                }}>Thanh toán đơn hàng thành công</Text>
                            </View>
                            {this.renderOrderInfor(orderDetail)}
                            <View style={[styles.formgroupWapper, styles.formButton,{flexDirection: 'row'} ]}>
                                <TouchableOpacity style={styles.submitButton}
                                                  onPress={() => this.props.dispatch(Actions.jumpTo('Home'))}>
                                    <Text style={[styles.submitText,{paddingHorizontal: 10}]}>{'Tiếp Tục Mua Sắm'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View>
                            <View style={{
                                backgroundColor: '#ff9433',
                                padding: 10,
                                marginBottom: 15,
                            }}>
                                <Text style={{
                                    fontWeight: '500',
                                    fontSize: 14,
                                    color: '#FFF'
                                }}>Vui lòng nhập mã OTP để xác thực giao dịch. Mã có thể được gửi thông qua số di động
                                    của quý khách</Text>
                            </View>
                            {this.renderOrderInfor(orderDetail)}
                            <View style={[styles.inputLabel,{flexDirection: 'row'}]}>
                                <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                           style={styles.input}
                                           keyboardType={'numeric'}
                                           placeholder="*Mã OTP"
                                           placeholderTextColor='#c5c5c5'
                                           onChangeText={(otp) => this.setState({otp: otp})}
                                           ref="card_number"
                                           blurOnSubmit={false}
                                           value={this.state.otp}
                                />
                            </View>
                            <Text style={[{marginLeft: 12, color: 'red'}, !this.state.error_otp && {display:'none'}]}>Vui lòng nhập mã OTP</Text>
                            <View style={[styles.formgroupWapper, styles.formButton]}>
                                <TouchableOpacity style={styles.submitButton}
                                                  onPress={() => this._submitAuthTransaction()}>
                                    <Text
                                        style={styles.submitText}>{this.props.isAuthTransaction ? 'Đang xác thực'.toUpperCase() : 'Xác Thực Giao Dịch'.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton}
                                                  onPress={() => {
                                                      this.props.dispatch(Actions.cancelOrder({id: orderDetail.order_id}));
                                                      this.props.dispatch(Actions.jumpTo('Home'))
                                                  }}>
                                    <Text style={styles.submitText}>{'Hủy Giao Dịch'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            )
        } else {
            //Open webview for update
            return (
                <View style={{flex:1}}>
                    <View style={{
                        backgroundColor: '#ff9433',
                        padding: 10,
                    }}>
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 14,
                            color: '#FFF'
                        }}>Vui lòng thực hiện thanh toán với ngân hàng. Bấm "Xong" sau khi hoàn tất thanh toán để xác nhận.</Text>
                    </View>
                    <WebView
                        source={{uri: onlineData.Auth_url}}
                        style={{height: ScreenHeight, width: ScreenWidth}}
                    />
                    <View style={{marginBottom: 5, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
                        <TouchableOpacity style={{width: ScreenWidth/2 - 20, backgroundColor: '#FF9800', marginRight: 5}} onPress={()=>this._doneWebViewAuth()}>
                            <Text style={styles.submitText}>{'Xong'.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: ScreenWidth/2 - 20, backgroundColor: '#9e9d9e', marginLeft: 5}}
                                          onPress={() => {
                                              this.props.dispatch(Actions.cancelOrder({id: orderDetail.order_id}));
                                              this.props.dispatch(Actions.jumpTo('Home'))
                                          }}>
                            <Text style={styles.submitText}>{'Hủy Giao Dịch'.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    _doneWebViewAuth() {
        this.props.dispatch(Actions.getTransactionDetail({params: {
            token: this.props.onlinePaymentData.Token,
            isFail: true
        }}));
    }
    render() {
        let payType  = this.props.paymentType ? this.props.paymentType : 1,
            orderDetail = this.props.successOrder,
            bankList = this.props.bankList,
            monthList = [
                {key: '01', label: 'Tháng 1'},
                {key: '02', label: 'Tháng 2'},
                {key: '03', label: 'Tháng 3'},
                {key: '04', label: 'Tháng 4'},
                {key: '05', label: 'Tháng 5'},
                {key: '06', label: 'Tháng 6'},
                {key: '07', label: 'Tháng 7'},
                {key: '08', label: 'Tháng 8'},
                {key: '09', label: 'Tháng 9'},
                {key: '10', label: 'Tháng 10'},
                {key: '11', label: 'Tháng 11'},
                {key: '12', label: 'Tháng 12'},
            ];
        return (
            <View style={styles.container}>
                <Spinner visible={this.props.isFetchingUserBank || this.props.isProcessPayment} color="#0074D9"/>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                {!_.isEmpty(this.props.transactionDetail) ?
                    this.viewTransDetail(this.props.transactionDetail)
                    :
                !_.isEmpty(this.props.onlinePaymentData) ?
                    this.renderConfirmCode() :
                    payType == 2 ?
                    <View>
                        <View style={{
                            backgroundColor: '#80ec5f',
                            padding: 10,
                            marginBottom: 15,
                        }}>
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 14,
                                color: '#FFF'
                            }}>Đặt hàng thành công. Đơn hàng của bạn sẽ được thanh toán trực tiếp bằng tiền mặt.</Text>
                        </View>
                        {this.renderOrderInfor(orderDetail)}
                        <View style={[styles.formgroupWapper, styles.formButton]}>
                            <TouchableOpacity style={styles.submitButton}
                                              onPress={() => this.props.dispatch(Actions.jumpTo('Home'))}>
                                <Text style={[styles.submitText]}>{'Tiếp Tục Mua Sắm'.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View keyboardShouldPersistTaps={'handled'}>
                        <View style={{
                            backgroundColor: '#ff9433',
                            padding: 10,
                        }}>
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 14,
                                color: '#FFF'
                            }}>{payType == 1 ?
                                'Đã gửi thông tin đặt hàng. Vui lòng nhập thông tin tài khoản để thanh toán với ngân hàng của bạn qua ATM' :
                                'Đã gửi thông tin đặt hàng. Vui lòng nhập thông tin tài khoản để thanh toán với ngân hàng của bạn qua Internet Banking'}</Text>
                        </View>
                        <ScrollView style={{paddingBottom: 40, marginBottom: 40}}>
                            <View style={styles.cartHeader}>
                                <Text style={{color: '#74726D', fontSize: 18}}>Mã đơn hàng:</Text>
                                <Text style={{fontSize:16}}>{orderDetail.order_id}</Text>
                            </View>
                            <View style={[styles.cartHeader, {
                                borderBottomWidth: 1,
                                borderColor: '#ccc',
                                paddingBottom: 12
                            }]}>
                                <Text style={{color: '#74726D', fontSize: 18}}>Tổng thanh toán:</Text>
                                <Text style={{fontSize:16}}>{orderDetail.order_total_discount > 0 ? formatMoney(orderDetail.order_total_discount, 0) : formatMoney(orderDetail.order_total_money, 0)}đ</Text>
                            </View>
                            <View style={styles.inputLabel}>
                                <ModalSelector
                                    data={bankList}
                                    initValue=""
                                    style={styles.modal}
                                    accessible={true}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    onChange={(option) => {
                                        this.setState({user_bank_code: option.key, bankName: option.label})
                                    }}>
                                    <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                               style={styles.input}
                                               editable={false}
                                               placeholder="*Chọn ngân hàng để thanh toán"
                                               placeholderTextColor='#c5c5c5'
                                               value={this.state.bankName}
                                    />
                                </ModalSelector>
                            </View>
                            <Text style={[{marginLeft: 12, color: 'red'}, !this.state.error_user_bank_code && {display:'none'}]}>Vui lòng chọn ngân hàng</Text>
                            <View style={styles.inputLabel}>
                                <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                           style={styles.input}
                                           placeholder="*Số thẻ/Số tài khoản"
                                           keyboardType={payType == 1 ? 'numeric': 'default'}
                                           placeholderTextColor='#c5c5c5'
                                           onChangeText={(user_card_number) => this.setState({user_card_number: user_card_number})}
                                           ref="card_number"
                                           blurOnSubmit={false}
                                           onSubmitEditing={() => this._focusNextField('full_name')}
                                           value={this.state.user_card_number}
                                />
                            </View>
                            <Text style={[{marginLeft: 12, color: 'red'}, !this.state.error_user_card_number && {display:'none'}]}>Vui lòng nhập số thẻ</Text>
                            <View style={styles.inputLabel}>
                                <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                           style={styles.input}
                                           placeholder="*Họ tên chủ thẻ"
                                           onChangeText={(user_card_fullname) => this.setState({user_card_fullname: user_card_fullname})}
                                           placeholderTextColor='#c5c5c5'
                                           ref="full_name"
                                           blurOnSubmit={false}
                                           onSubmitEditing={() => this._focusNextField('user_card_month')}
                                           value={this.state.user_card_fullname}
                                />
                            </View>
                            <Text style={[{marginLeft: 12, color: 'red'}, !this.state.error_user_card_fullname && {display:'none'}]}>Vui lòng nhập tên chủ thẻ</Text>
                            <View style={[styles.inputSpecialLabel, payType == 1 ? {} : {display:'none'}]}>
                                <ModalSelector
                                    data={monthList}
                                    initValue=""
                                    style={styles.modal}
                                    accessible={true}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    onChange={(option) => {
                                        this.setState({user_card_month: option.key})
                                    }}>
                                    <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                               style={styles.inputSpecial}
                                               placeholder="*Tháng"
                                               editable={false}
                                               placeholderTextColor='#c5c5c5'
                                               ref="user_card_month"
                                               value={this.state.user_card_month}
                                    />
                                </ModalSelector>
                                <Text style={{fontSize: 20, fontWeight: '400', paddingLeft: 10}}> / </Text>
                                <ModalSelector
                                    data={this._getYearList()}
                                    initValue=""
                                    style={styles.modal}
                                    accessible={true}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    onChange={(option) => {
                                        this.setState({user_card_year: option.key,})
                                    }}>
                                    <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                               style={styles.inputSpecial}
                                               placeholder="*Năm"
                                               editable={false}
                                               placeholderTextColor='#c5c5c5'
                                               ref="user_card_year"
                                               value={this.state.user_card_year}
                                    />
                                </ModalSelector>
                            </View>
                            <Text style={[{marginLeft: 12, marginBottom: 5, color: 'red'}, !this.state.error_user_card_month && {display:'none'}]}>Vui lòng nhập tháng hết hạn</Text>
                            <Text style={[{marginLeft: 12, color: 'red'}, !this.state.error_user_card_year && {display:'none'}]}>Vui lòng nhập năm hết hạn</Text>
                            <View style={[styles.formgroupWapper, styles.formButton]}>
                                <TouchableOpacity style={styles.submitButton} onPress={() => this._submitOnlinePayment()}>
                                    <Text style={styles.submitText}>{this.props.isProcessPayment ? 'Đang xác nhận'.toUpperCase() : 'Xác Nhận Thanh Toán'.toUpperCase()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton}
                                                  onPress={() => {
                                                      this.props.dispatch(Actions.cancelOrder({id: orderDetail.order_id}));
                                                      this.props.dispatch(Actions.jumpTo('Home'))
                                                  }}>
                                    <Text style={styles.submitText}>{'Hủy Giao Dịch'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingBottom: 40}}/>
                        </ScrollView>
                    </View>
                }
                {this.renderFooter()}
            </View>
        )
    }
}

function mapStateToProps({auth, transaction}) {
    return {
        oUser: auth.oUser,
        position: auth.position,
        saleOffInfo: transaction.saleOffInfo,
        successOrder: transaction.successOrder,
        paymentType: transaction.paymentType,
        bankList: transaction.bankList,
        isProcessPayment: transaction.onlinePayment.isProcess,
        isDonePayment: transaction.onlinePayment.isDone,
        onlinePaymentData: transaction.onlinePayment.data,
        isAuthTransaction: transaction.authTransaction.isProcess,
        isAuthSuccess: transaction.authTransaction.isSuccess,
        authTransactionData: transaction.authTransaction.data,
        transactionDetail: transaction.transactionDetail.data,
        isGetDetailTrans: transaction.transactionDetail.isFetching,
        nlBankList: transaction.nlBank,
        ibCardInfo: transaction.ibCardInfo.data,
        atmCardInfo: transaction.atmCardInfo.data,
        isFetchingUserBank: transaction.atmCardInfo.isFetching || transaction.ibCardInfo.isFetching,
    }
}

export default connect(mapStateToProps, null)(connectAlert(ProcessOrder));
