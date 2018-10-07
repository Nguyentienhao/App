import React, {Component} from "react";
import {
    Text,
    View,
    BackHandler,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Animated,
    FlatList,
    Alert,
    RefreshControl
} from "react-native";
import styles from "./styles";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {connectAlert} from "../../../components/alertDropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import {translate} from "../../../languages/locale";
import * as Actions from "../../../actions";
import moment from "moment";
import Products from "../../../components/Products";
import StatusBarBackground from "../../../components/StatusBarBackground";
import HeaderSearch from "../../HeaderSearch";
import Toast from "react-native-simple-toast";

class Transaction extends Component {

    constructor (props) {
        super(props);

        this.state = {
            transaction: false,
            whichTab:'Delivering',
            transToggle: this.props.transToggle
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    handleBackButtonClick () {
        this.props.navigation.goBack(null);
        return true;
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    static navigationOptions = ({navigation}) => {

        return {
            title: translate('Lịch sử giao dịch'),
            tabBarLabel: translate('Lịch sử giao dịch'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={"md-person"}
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
        if (nextProps.loginError) {
            this.props.alertWithType('error', 'Error', nextProps.loginError);
        }
        this.setState({
            transToggle: nextProps.transToggle
        })
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _fetchData () {
        let order = {
            page:1,
            limit:12,
            status:1
        };
        this.props.dispatch(Actions.getOrders({params: {...order, status:1}}));
        this.props.dispatch(Actions.getOrders({params: {...order, status:2}}));
        this.props.dispatch(Actions.getOrders({params: {...order, status:3}}));
    }
    componentDidMount () {
        this._fetchData()
    }
    componentWillUpdate(nextProps) {
        if (nextProps.isCancellingOrder === false
            && nextProps.bCancelSuccess !== this.props.bCancelSuccess) {
            if (nextProps.bCancelSuccess === false) {
                Alert.alert(
                    "Xảy ra lỗi",
                    "Không thể hủy đơn hàng",[

                    ], { cancelable: true })
            } else {
                Toast.show('Hủy đơn hàng thành công');
                let order = {
                    page:1,
                    limit:12,
                    status:1
                };
                this.props.dispatch(Actions.getOrders({params: {...order, status:1}}));
                this.props.dispatch(Actions.getOrders({params: {...order, status:3}}));
            }
        }
    }
    _loadMoreOrders(status) {
        if (!this.props.listEnd[status]) {
            let order = {
                page: this.props.listPage[status] ? this.props.listPage[status] + 1 : 1,
                limit:12,
                status: status
            };
            this.props.dispatch(Actions.getOrders({params: order}));
        }
    }
    renderTransaction (trans, is_delivering) {
        let _toggleSubview = (bill_id) => {
            let transToggle = this.state.transToggle;
            console.log('transToggle', transToggle);
            transToggle[bill_id] = !transToggle[bill_id];
            this.setState({
                transToggle: transToggle
            })
        };
        return (
            <View style={styles.orderContainer} key={trans.bill_id}>
                <View style={[...styles.rowContainer, {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    paddingBottom: 6,
                    borderColor: '#cbcbcb'
                }]}>
                    <View style={{paddingHorizontal: 12, flex: 1, flexDirection: 'row', paddingBottom: 6}}>
                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                            <View style={styles.rowLeft}>
                                <Text style={{fontWeight: '700'}}>Đơn hàng #{trans.bill_id}</Text>
                                {is_delivering ?
                                    <TouchableOpacity style={{
                                        backgroundColor: '#EF9800',
                                    }} onPress={() => this._cancelOrder(trans.bill_id)}>
                                        <Text style={{
                                            padding: 5,
                                            color: '#FFFFFF',
                                            fontSize: 12,
                                        }}>Hủy Đơn Hàng</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                            </View>
                            <View style={styles.rowLeft}>
                                <Text style={{color: '#74726D'}}>{moment(`${trans.bill_order_datetime}`).format('HH:ss DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => _toggleSubview(trans.bill_id)}>
                            <View style={styles.orderToggleIcon}>
                                <Ionicons name={this.state.transToggle[trans.bill_id] ? "ios-arrow-down" : "ios-arrow-up"}
                                          size={15}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View style={[styles.orderItemsContainer, this.state.transToggle[trans.bill_id] && {display:'none'}]}>
                    <Products data={trans.billDetails} dispatch={this.props.dispatch} view="list" page="history"/>
                </Animated.View>
            </View>
        );
    }

    renderHeaderSearch = () => {
        return (
            <HeaderSearch/>
        )
    }

    _isFetching() {
        return this.props.isFetchingHistory;
    }
    _onRefresh() {
        this._fetchData();
    }
    _cancelOrder = (bill_id) => {
        if (bill_id) {
            Alert.alert(
                translate('Xác nhận'),
                translate('Bạn có chắc muốn hủy đơn hàng đã chọn?'),
                [
                    {text: translate('Cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: translate('Ok'), onPress: () => this.props.dispatch(Actions.cancelOrder({id: bill_id}))},
                ],
                { cancelable: false }
            );
        }
    }
    render () {
        return (
            <View style={styles.container}>
                <StatusBarBackground/>
                {this.renderHeaderSearch()}
                <View style={styles.sectionHeader}>
                    <TouchableOpacity style={[this.state.whichTab === 'Delivering' ?  styles.whenActive : null ]} onPress={() => {
                        this.setState({whichTab:'Delivering'});
                    }}>
                        <Text style={[styles.tabBarButton, this.state.whichTab ==='Delivering' ? styles.whenActiveColor : null]}>{translate('Đang Giao')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[this.state.whichTab === 'Delivered' ?  styles.whenActive : null ]} onPress={() => {
                        this.setState({whichTab:'Delivered'});
                    }}>
                        <Text style={[styles.tabBarButton, this.state.whichTab === 'Delivered' ? styles.whenActiveColor : null ]}>{translate('Đã Giao')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[this.state.whichTab === 'Canceled' ?  styles.whenActive : null ]} onPress={() => {
                        this.setState({whichTab:'Canceled'});
                    }}>
                        <Text style={[styles.tabBarButton, this.state.whichTab === 'Canceled' ? styles.whenActiveColor : null ]}>{translate('Đã Hủy')}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.container}
                >
                    {
                        this.props.ordersList1.length
                            ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={[styles.listTrans, this.state.whichTab !== 'Delivering' && {display: 'none'}]}
                                onEndReached={() => this._loadMoreOrders(1)}
                                data={this.props.ordersList1}
                                renderItem={({item}) => (
                                    this.renderTransaction(item, true)
                                )}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this._isFetching()}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                            />
                            :
                            !this.props.isFetching1 ?
                                <ScrollView
                                    style={[this.state.whichTab !== 'Delivering' && {display: 'none'}]}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this._isFetching()}
                                            onRefresh={this._onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    <Text style={{textAlign: 'center'}}>{translate('Lịch sử trống')}</Text>
                                </ScrollView>
                                : null

                    }
                    {
                        this.props.ordersList2.length
                            ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={[styles.listTrans, this.state.whichTab !== 'Delivered' && {display: 'none'}]}
                                onEndReached={() => this._loadMoreOrders(2)}
                                data={this.props.ordersList2}
                                renderItem={({item}) => (
                                    this.renderTransaction(item, false)
                                )}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this._isFetching()}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                            />
                            :
                            !this.props.isFetching2 ?
                                <ScrollView
                                    style={[this.state.whichTab !== 'Delivered' && {display: 'none'}]}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this._isFetching()}
                                            onRefresh={this._onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    <Text style={{textAlign: 'center'}}>{translate('Lịch sử trống')}</Text>
                                </ScrollView>
                                : null
                    }
                    {
                        this.props.ordersList3.length
                            ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={[styles.listTrans, this.state.whichTab !== 'Canceled' && {display: 'none'}]}
                                onEndReached={() => this._loadMoreOrders(3)}
                                data={this.props.ordersList3}
                                renderItem={({item}) => (
                                    this.renderTransaction(item, false)
                                )}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this._isFetching()}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                            />
                            :
                            !this.props.isFetching3 ?
                                <ScrollView
                                    style={[this.state.whichTab !== 'Canceled' && {display: 'none'}]}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this._isFetching()}
                                            onRefresh={this._onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    <Text  style={[{textAlign: 'center'}, this.state.whichTab !== 'Canceled' && {display: 'none'}]}>{translate('Lịch sử trống')}</Text>
                                </ScrollView>
                                : null
                    }
                </View>
            </View>
        )
    }
}
function _processToggle(list1, list2, list3) {
    let transToggle = [];
    list1.map(trans1 => {
       transToggle[trans1.bill_id] = true;
    });
    list2.map(trans2 => {
       transToggle[trans2.bill_id] = true;
    });
    list3.map(trans3 => {
       transToggle[trans3.bill_id] = true;
    });
    return transToggle;
}
function mapStateToProps ({nav, auth, transaction}) {
    let toggle = _processToggle(transaction.ordersList1.data, transaction.ordersList2.data, transaction.ordersList3.data);
    return {
        oUser: auth.oUser,
        isFetching: auth.bIsLoading,
        bIsLoggedIn: auth.bIsLoggedIn,
        listPage: {
            '1': transaction.ordersList1.params.page,
            '2': transaction.ordersList2.params.page,
            '3': transaction.ordersList3.params.page,
        },
        listEnd: {
            '1': transaction.ordersList1.isEnd,
            '2': transaction.ordersList2.isEnd,
            '3': transaction.ordersList3.isEnd,
        },
        isFetchingHistory: transaction.ordersList1.isFetching || transaction.ordersList2.isFetching || transaction.ordersList3.isFetching,
        isFetching1: transaction.ordersList1.isFetching,
        isFetching2: transaction.ordersList2.isFetching,
        isFetching3: transaction.ordersList3.isFetching,
        ordersList1: transaction.ordersList1.data,
        ordersList2: transaction.ordersList2.data,
        ordersList3: transaction.ordersList3.data,
        isCancellingOrder: transaction.isCancellingOrder,
        bCancelSuccess: transaction.bCancelSuccess,
        transToggle: toggle
    }
}

export default connect(mapStateToProps, null)(connectAlert(Transaction));
