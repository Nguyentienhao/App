import React, {Component} from 'react';
import {Text, View, BackHandler, TextInput,TouchableOpacity,
    ScrollView,Alert} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-loading-spinner-overlay";
import {translate} from "../../../languages/locale";
import * as Actions from "../../../actions";
import StatusBarBackground from "../../../components/StatusBarBackground";
import ModalSelector from "react-native-modal-selector";
import HeaderSearch from "../../HeaderSearch";
import PropTypes from "prop-types";
import Toast from "react-native-simple-toast";
import _ from "lodash";

class BankAccount extends Component {

    constructor (props) {
        super(props);

        this.state = {
            whichTab: 'ATM',
            isEditingAtm: false,
            isEditingIb: false,
            atmCardInfo: this.props.atmCardInfo,
            atmBankName: this.props.atmBankName,
            ibBankName: this.props.ibBankName,
            ibCardInfo: this.props.ibCardInfo
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick () {
        this.props.navigation.goBack(null);
        return true;
    }

    _fetchData () {
        this.props.dispatch(Actions.getAtmAccount({}));
        this.props.dispatch(Actions.getIbAccount({}));
    }
    componentDidMount () {
        this._fetchData()
    }
    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    static navigationOptions = ({navigation}) => {

        return {
            title: translate('Tài Khoản Ngân Hàng'),
            tabBarLabel: translate('Tài Khoản Ngân Hàng'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={"ios-card-outline"}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            swipeEnabled: false,
            header: null
        }
    };
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        alertWithType: PropTypes.func,
    };
    componentWillReceiveProps (nextProps) {
        this.setState({
            atmCardInfo: nextProps.atmCardInfo || {},
            ibCardInfo: nextProps.ibCardInfo || {},
            atmBankName: nextProps.atmBankName,
            ibBankName: nextProps.ibBankName,
        })
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    renderHeaderSearch = () => {
        return (
            <HeaderSearch/>
        )
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
    _updateAtmAccount() {
        let data = this.state.atmCardInfo,
            inValid = false;
        if (this.state.isEditingAtm) {
            _.each(data, function (value) {
                if (value === "" || value === null) {
                    inValid = true;
                }
            });
            if (inValid) {
                Alert.alert(
                    "Xảy ra lỗi",
                    "Vui lòng nhập đầy đủ thông tin tài khoản", [], {cancelable: true})
                return false;
            } else {
                this.props.dispatch(Actions.updateAtmAccount({
                    params: data
                }));
            }
            this.setState({
                isEditingAtm: !this.state.isEditingAtm
            });
        } else {
            this.setState({
                isEditingAtm: !this.state.isEditingAtm
            });
        }
    }
    _updateIbAccount() {
        let data = this.state.ibCardInfo,
            inValid = false;
        if (this.state.isEditingIb) {
            _.each(data, function (value) {
                console.log('_updateIbAccount', value)
                if (value === "" || value === null) {
                    inValid = true;
                }
            });
            if (inValid) {
                Alert.alert(
                    "Xảy ra lỗi",
                    "Vui lòng nhập đầy đủ thông tin tài khoản", [], {cancelable: true})
                return false;
            } else {
                this.props.dispatch(Actions.updateIbAccount({
                    params: data
                }));
            }
            this.setState({
                isEditingIb: !this.state.isEditingIb
            });
        } else {
            this.setState({
                isEditingIb: !this.state.isEditingIb
            });
        }
    }
    render () {
        let bankList = this.props.bankList,
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
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <View style={styles.sectionHeader}>
                    <TouchableOpacity style={[this.state.whichTab === 'ATM' ?  styles.whenActive : null ]} onPress={() => {
                        this.setState({whichTab:'ATM'});
                    }}>
                        <Text style={[styles.tabBarButton, this.state.whichTab ==='ATM' ? styles.whenActiveColor : null]}>{translate('ATM')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[this.state.whichTab === 'IB' ?  styles.whenActive : null ]} onPress={() => {
                        this.setState({whichTab:'IB'});
                    }}>
                        <Text style={[styles.tabBarButton, this.state.whichTab === 'IB' ? styles.whenActiveColor : null ]}>{translate('Internet Banking')}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.container}
                >
                    {
                        <ScrollView style={[this.state.whichTab !== 'ATM' && {display: 'none'}]}>
                            {_.isEmpty(this.state.atmCardInfo)
                                ?
                                <Text style={[{textAlign: 'center', paddingTop: 10}]}>Vui lòng đợi...</Text>
                                :
                                !this.props.isFetchingAtm ?
                                    <View>
                                        <Text style={{textAlign: 'center', padding: 10, backgroundColor: '#dcdcdc', color: "#FF9800", fontSize: 18, fontWeight: '700'}}>THÔNG TIN THẺ ATM</Text>
                                        <View style={[{paddingHorizontal: 15}, this.state.isEdit ? {display:'none'} : null]}>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.inputLabel}>Ngân Hàng:</Text>
                                                <ModalSelector
                                                    data={bankList}
                                                    initValue=""
                                                    style={styles.modal}
                                                    accessible={true}
                                                    disabled={!this.state.isEditingAtm}
                                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                                    onChange={(option) => {
                                                        _newState = this.state.atmCardInfo;
                                                        _newState.user_bank_code = option.key;
                                                        this.setState({
                                                            atmCardInfo: _newState,
                                                            atmBankName: option.label
                                                        })
                                                    }}>
                                                    <TextInput
                                                        multiline={true}
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                        style={[styles.input, this.state.isEditingAtm ? {color: '#333333'} : null]}
                                                        editable={false}
                                                        placeholder="N/A"
                                                        placeholderTextColor='#a09e9b'
                                                        value={!_.isEmpty(this.state.atmBankName) ? this.state.atmBankName : null}
                                                    />
                                                </ModalSelector>
                                            </View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.inputLabel}>Số Thẻ:</Text>
                                                <TextInput
                                                    keyboardType={'numeric'}
                                                    style={[styles.input, this.state.isEditingAtm ? {color: '#333333'} : null]}
                                                    editable={this.state.isEditingAtm}
                                                    placeholderTextColor="#a09e9b"
                                                    placeholder="N/A"
                                                    onChangeText={(user_card_number) => {
                                                        _newState = this.state.atmCardInfo;
                                                        _newState.user_card_number = user_card_number;
                                                        this.setState({atmCardInfo: _newState})
                                                    }}
                                                    value={!_.isEmpty(this.state.atmCardInfo.user_card_number) ? this.state.atmCardInfo.user_card_number : null}
                                                />
                                            </View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.inputLabel}>Tên Chủ Thẻ:</Text>
                                                <TextInput
                                                    style={[styles.input, this.state.isEditingAtm ? {color: '#333333'} : null]}
                                                    editable={this.state.isEditingAtm}
                                                    placeholderTextColor="#a09e9b"
                                                    placeholder="N/A"
                                                    onChangeText={(user_card_fullname) => {
                                                        _newState = this.state.atmCardInfo;
                                                        _newState.user_card_fullname = user_card_fullname;
                                                        this.setState({atmCardInfo: _newState})
                                                    }}
                                                    value={!_.isEmpty(this.state.atmCardInfo.user_card_fullname) ? this.state.atmCardInfo.user_card_fullname : null}
                                                />
                                            </View>
                                            <View style={[styles.formGroup,{justifyContent: 'flex-start'}]}>
                                                <Text style={[styles.inputLabel,{marginRight: 10}]}>Ngày Hết Hạn:</Text>
                                                <ModalSelector
                                                    data={monthList}
                                                    initValue=""
                                                    style={styles.modal}
                                                    accessible={true}
                                                    disabled={!this.state.isEditingAtm}
                                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                                    onChange={(option) => {
                                                        _newState = this.state.atmCardInfo;
                                                        _newState.user_card_month = option.key;
                                                        this.setState({
                                                            atmCardInfo: _newState
                                                        })
                                                    }}
                                                >
                                                    <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                                               style={[styles.inputSpecial, this.state.isEditingAtm ? {color: '#333333'} : null]}
                                                               placeholder="N/A"
                                                               editable={false}
                                                               placeholderTextColor='#a09e9b'
                                                               ref="user_card_month"
                                                               value={this.state.atmCardInfo.user_card_month.toString()}
                                                    />
                                                </ModalSelector>
                                                <Text style={{fontSize: 20, fontWeight: '400', paddingLeft: 10}}> / </Text>
                                                <ModalSelector
                                                    data={this._getYearList()}
                                                    initValue=""
                                                    style={styles.modal}
                                                    accessible={true}
                                                    disabled={!this.state.isEditingAtm}
                                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                                    onChange={(option) => {
                                                        _newState = this.state.atmCardInfo;
                                                        _newState.user_card_year = option.key;
                                                        this.setState({
                                                            atmCardInfo: _newState
                                                        })
                                                    }}
                                                    >
                                                    <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                                                               style={[styles.inputSpecial, this.state.isEditingAtm ? {color: '#333333'} : null]}
                                                               placeholder="N/A"
                                                               editable={false}
                                                               placeholderTextColor='#a09e9b'
                                                               ref="user_card_year"
                                                               value={this.state.atmCardInfo.user_card_year.toString()}
                                                    />
                                                </ModalSelector>
                                            </View>
                                        </View>
                                        <Text style={[{marginLeft: 12, color: 'red'}, !this.state.error_user_card_year && {display:'none'}]}>Vui lòng nhập năm hết hạn</Text>
                                        <View style={[styles.formgroupWapper, styles.formButton]}>
                                            <TouchableOpacity style={styles.submitButton}
                                                              onPress={() => this._updateAtmAccount()}
                                            >
                                                <Text style={styles.submitText}>{this.props.isUpdateAtmAccount ? 'ĐANG CẬP NHẬT' : this.state.isEditingAtm ? 'LƯU THÔNG TIN' : 'CẬP NHẬT THÔNG TIN ATM'}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.cancelButton, !this.state.isEditingAtm && {display:'none'}]}
                                                              onPress={() => {
                                                                  this.props.dispatch(Actions.getAtmAccount({})),
                                                                  this.setState({isEditingAtm: !this.state.isEditingAtm})
                                                                }
                                                              }>
                                                <Text style={styles.submitText}>HỦY</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    : null
                            }
                        </ScrollView>

                    }
                    {
                        <ScrollView style={[this.state.whichTab !== 'IB' && {display: 'none'}]}>
                            {_.isEmpty(this.state.ibCardInfo)
                                ?
                                <Text style={[{textAlign: 'center', paddingTop: 10}]}>Vui lòng đợi...</Text>
                                :
                                !this.props.isFetchingIb ?
                                    <View>
                                        <Text style={{textAlign: 'center', padding: 10, backgroundColor: '#dcdcdc', color: "#FF9800", fontSize: 18, fontWeight: '700'}}>THÔNG TIN INTERNET BANKING</Text>
                                        <View style={[{paddingHorizontal: 15}, this.state.isEdit ? {display:'none'} : null]}>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.inputLabel}>Ngân Hàng:</Text>
                                                <ModalSelector
                                                    data={bankList}
                                                    initValue=""
                                                    style={styles.modal}
                                                    accessible={true}
                                                    disabled={!this.state.isEditingIb}
                                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                                    onChange={(option) => {
                                                        _newState = this.state.ibCardInfo;
                                                        _newState.user_ib_bank_code = option.key;
                                                        this.setState({
                                                            ibCardInfo: _newState,
                                                            ibBankName: option.label
                                                        })
                                                    }}>
                                                    <TextInput
                                                        multiline={true}
                                                        underlineColorAndroid='rgba(0,0,0,0)'
                                                               style={[styles.input, this.state.isEditingIb ? {color: '#333333'} : null]}
                                                               editable={false}
                                                               placeholder="N/A"
                                                               placeholderTextColor='#a09e9b'
                                                               value={!_.isEmpty(this.state.ibBankName) ? this.state.ibBankName : null}
                                                    />
                                                </ModalSelector>
                                            </View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.inputLabel}>Số Tài Khoản:</Text>
                                                <TextInput
                                                    style={[styles.input, this.state.isEditingIb ? {color: '#333333'} : null]}
                                                    editable={this.state.isEditingIb}
                                                    placeholderTextColor="#a09e9b"
                                                    placeholder="N/A"
                                                    onChangeText={(user_ib_number) => {
                                                        _newState = this.state.ibCardInfo;
                                                        _newState.user_ib_number = user_ib_number;
                                                        this.setState({ibCardInfo: _newState})
                                                    }}
                                                    value={!_.isEmpty(this.state.ibCardInfo.user_ib_number) ? this.state.ibCardInfo.user_ib_number : null}
                                                />
                                            </View>
                                            <View style={styles.formGroup}>
                                                <Text style={styles.inputLabel}>Tên Chủ TK:</Text>
                                                <TextInput
                                                    style={[styles.input, this.state.isEditingIb ? {color: '#333333'} : null]}
                                                    editable={this.state.isEditingIb}
                                                    placeholderTextColor="#a09e9b"
                                                    placeholder="N/A"
                                                    onChangeText={(user_ib_fullname) => {
                                                        _newState = this.state.ibCardInfo;
                                                        _newState.user_ib_fullname = user_ib_fullname;
                                                        this.setState({ibCardInfo: _newState})
                                                    }}
                                                    value={!_.isEmpty(this.state.ibCardInfo.user_ib_fullname) ? this.state.ibCardInfo.user_ib_fullname : null}
                                                />
                                            </View>
                                            <View style={[styles.formgroupWapper, styles.formButton]}>
                                                <TouchableOpacity style={styles.submitButton}
                                                                  onPress={() => this._updateIbAccount()}
                                                >
                                                    <Text style={styles.submitText}>{this.props.isUpdateIbAccount ? 'ĐANG CẬP NHẬT' : this.state.isEditingIb ? 'LƯU THÔNG TIN' : 'CẬP NHẬT THÔNG TIN IB'}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={[styles.cancelButton, !this.state.isEditingIb && {display:'none'}]}
                                                                  onPress={() => { this.props.dispatch(Actions.getIbAccount({})), this.setState({
                                                                      isEditingIb: !this.state.isEditingIb
                                                                  })}}>
                                                    <Text style={styles.submitText}>HỦY</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    : null
                            }
                        </ScrollView>
                    }
                </View>
            </View>
        )
    }
}
function getBankName(bankCode, bankList) {
    let name = '';
    bankList.map((bank) => {
       if (bank.key == bankCode) {
           name = bank.label
       }
    });
    return name;
}
function mapStateToProps ({profile, auth, transaction}) {
    return {
        oUser: auth.oUser,
        bankList: transaction.bankList,
        isUpdateAtmAccount: transaction.isUpdateAtmAccount,
        isUpdateIbAccount: transaction.isUpdateIbAccount,
        atmCardInfo: transaction.atmCardInfo.data,
        atmBankName: typeof transaction.atmCardInfo.data.user_bank_code !== 'undefined' ? getBankName(transaction.atmCardInfo.data.user_bank_code, transaction.bankList) : '',
        ibBankName: typeof transaction.ibCardInfo.data.user_ib_bank_code !== 'undefined' ? getBankName(transaction.ibCardInfo.data.user_ib_bank_code, transaction.bankList) : '',
        isFetchingAtm: transaction.atmCardInfo.isFetching,
        ibCardInfo: transaction.ibCardInfo.data,
        isFetchingIb: transaction.ibCardInfo.isFetching,
        bIsLoggedIn: auth.bIsLoggedIn,
        isSuccess: profile.isSuccess
    }
}

export default connect(mapStateToProps, null)(connectAlert(BankAccount));
