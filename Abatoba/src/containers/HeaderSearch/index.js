import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    Alert,
    Modal, ActivityIndicator
} from 'react-native';
import Button from 'react-native-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from '../../configs/colors';
import * as Action from '../../actions/index';
import {connect} from "react-redux";
import {withNavigation} from 'react-navigation';
import Permissions from 'react-native-permissions'
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Actions from "../../actions";
import Toast from "react-native-simple-toast";
import {getProductDetail} from "../../actions";

class HeaderSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            modalVisible: false,
            limit: 12,
            page: 1,
            idProduct: ''
        }
    }

    _search() {
        let page;
        if (!this.props.isSearchPage) {
            this.props.dispatch(Action.jumpTo("Search", {isSearchPage: true}));
            if (this.state.keywords !== '') {
                if (this.state.keywords === this.props.lstSearchProduct.params.keywords)
                    page = Math.ceil(this.props.lstSearchProduct.items.length / this.state.limit) + 1;
                else page = 1;
                this.props.dispatch(Actions.doSearch({
                    ...this.state,
                    page: page
                }));
            }
        } else {
            this.props.dispatch(Action.doSearch({
                keywords: this.state.keywords,
                page: 1,
                limit: 12
            }));
        }
    }

    _requestCameraPermission() {
        Permissions.request('camera', {
            rationale: {
                title: 'Cool Photo App Camera Permission',
                message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
            },
        }).then(response => {
            if (response === 'authorized') {
                // this.props.dispatch(Action.jumpTo('Scanner'))
                this.setState({
                    modalVisible: true
                })

            } else {
                let buttons = [{text: 'Cancel', style: 'cancel'}];
                if ((Platform.OS === 'ios') && Permissions.canOpenSettings())
                    buttons.push({
                        text: 'Settings',
                        onPress: Permissions.openSettings,
                    });
                Alert.alert('Whoops!', 'There was a problem getting your permission. Please enable it from settings.', buttons);
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('isExistProduct') && !nextProps.isFetchingDetail) {
            if (nextProps.isExistProduct) {
                // TODO: Get prod id and redirect here
                if (this.state.idProduct !== '') {
                    this.props.dispatch(Actions.jumpTo('ProductDetail', {
                        id: this.state.idProduct
                    }));
                    Toast.show('Thành công!');
                    this.setState({
                        idProduct: ''
                    });
                }
            }
        }
    }

    mounted() {
        this.setState({
            keyword: this.props.lstSearchProduct.params.keywords
        })
    }

    _onScanSuccess(e) {
        console.log('success', e);

        let payload = {
            "id": e.data,
        };
        this.setState({
            idProduct: e.data
        });
        this.props.navigation.dispatch(getProductDetail(payload));
        this.setState({
            modalVisible: false
        });
        Toast.show('Đang kiểm tra mã QR.');
    }

    renderScannerModal() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setState({
                        modalVisible: false
                    })
                }}>
                <QRCodeScanner
                    onRead={this._onScanSuccess.bind(this)}
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable} onPress={() => {
                            this.setState({
                                modalVisible: false
                            })
                        }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    }
                />
            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.searchBar}>
                {this.renderScannerModal()}
                <TouchableOpacity style={{paddingLeft: 10}}
                                  onPress={() => this.props.navigation.goBack()}>{this.props.hasBack ? <Ionicons
                    style={{paddingTop: 5, paddingRight: 15}}
                    name='ios-arrow-back'
                    size={28}
                    color="#FFF"
                /> : null}</TouchableOpacity>
                <TextInput
                    returnKeyType={'search'}
                    style={styles.searchBarInput}
                    placeholder="Tìm kiếm"
                    onChangeText={(keywords) => this.setState({keywords: keywords})}
                    value={this.state.keywords}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onSubmitEditing={() => this._search()}
                />
                <TouchableOpacity style={{position: 'absolute', top: 15, right: 60}}
                                  onPress={() => this._search()}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                        size={26}
                        color="#a1a1a1"
                    /></TouchableOpacity>
                <TouchableOpacity style={{marginTop: 5}}
                                  onPress={() => this._requestCameraPermission()}><Ionicons
                    name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                    size={26}
                    color="#FFF"
                />
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps({product}) {
    return {
        lstSearchProduct: product.lstSearchProduct,
        isFetchingDetail: product.productDetail.isFetching,
        isExistProduct: product.isExistProduct,
    }
}

export default withNavigation(connect(mapStateToProps, null)(HeaderSearch));