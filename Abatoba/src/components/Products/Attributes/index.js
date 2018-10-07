import React, {Component} from 'react';
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
    TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import _ from 'lodash';
import colors from './../../../configs/colors';
import * as Actions from "../../../actions";
import Toast from 'react-native-simple-toast';
import Material from 'react-native-vector-icons/MaterialIcons';

class ProductAttribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proQuantity: 1,
            proSize: '',
            proColor: '',
        }
    }
    updateQuantity = (newQuantity) => {
        let max_quantity = this.props.productDetail.pro_inventory;
        if (newQuantity > max_quantity) {
            newQuantity = max_quantity
        }
        if(newQuantity > 0){
            this.setState({
                proQuantity: newQuantity,
            })
        }
    }
    addProductToCart = () => {
        if (this.state.proQuantity < 1) {
            return;
        }
        if (!this.state.proColor.length || !this.state.proSize.length) {
            Alert.alert(
                "Xảy ra lỗi",
                "Vui lòng chọn màu sắc và kích thước", [], {cancelable: true})
            return;
        }
        this.props.dispatch(Actions.addToCart({
            "product": this.props.productDetail,
            "amount": this.state.proQuantity,
            "color": this.state.proColor,
            "size": this.state.proSize
        }));
        Toast.show("Thêm vào giỏ hàng thành công");
    }
    _onSelectColor = (value, index) => {
        this.setState({proColor: value.pro_collor_hex})
        if (typeof this.props.selectedAction !== 'undefined') {
            this.props.selectedAction(index);
        }
    }
    render() {
        let product = this.props.productDetail;
        let sizes = product.pro_sizes ? product.pro_sizes.split('_') : null;
        let { proQuantity } = this.state;
        return (
            <View style={[styles.proBlock, this.props.isModal ? {borderBottomWidth: 0, paddingHorizontal: 20} : null]}>
                <View style={styles.proAttrBlock}>
                    <Text style={styles.proAttrLabel}>Màu sắc:</Text>
                    <View style={styles.proAttrInfo}>
                        {product.pro_colors.map((value, index) => (
                                <TouchableOpacity onPress={() => this._onSelectColor(value, index)} key={index}
                                      style={[{ backgroundColor: `${value.pro_collor_hex}` }, styles.proAttrCircle, (this.state.proColor === value.pro_collor_hex ? {borderColor: colors.btnPrimary, borderWidth: 2} : null)]}
                                >
                                    {this.state.proColor === value.pro_collor_hex ?
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Material
                                            name="done"
                                            size={24}
                                            style={{
                                                color: colors.btnPrimary,
                                                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                                textShadowOffset: {width: 1, height: 1},
                                                textShadowRadius: 1
                                            }}
                                        /></View> : null
                                    }
                                </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.proAttrBlock}>
                    <Text style={styles.proAttrLabel}>Kích thước:</Text>
                    <View style={styles.proAttrInfo}>
                        {sizes !== null ? sizes.map((size, index) => (
                                <TouchableOpacity onPress={() => this.setState({proSize: size})} key={index}
                                                  style={{marginRight: 7, marginBottom: 7}}
                                >
                                    <Text style={[styles.proAttrSquare, (this.state.proSize === size ? {borderColor: colors.btnPrimary, borderWidth: 2} : null)]} key={index}>{size}</Text>
                                </TouchableOpacity>
                            )) : null}
                    </View>
                </View>
                <View style={[styles.proAttrQuantity, { marginBottom: 0 }]}>
                    <Text style={styles.proAttrLabel}>Số lượng:</Text>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <View style={styles.proQuantityCount}>
                            <TouchableOpacity onPress={() => this.updateQuantity(+proQuantity - 1)} style={styles.proQuantityCountBtn}>
                                <Material
                                    name="remove-circle-outline"
                                    size={24}
                                    style={{color: colors.btnPrimary}}
                                />
                            </TouchableOpacity>
                            <TextInput keyboardType={'numeric'} style={styles.proQuantityCountTxt} onChangeText={(proQuantity) => this.updateQuantity(proQuantity)} value={proQuantity.toString()}/>
                            <TouchableOpacity onPress={() => this.updateQuantity(+proQuantity + 1)} style={styles.proQuantityCountBtn}>
                                <Material
                                    name="control-point"
                                    size={24}
                                    style={{color: colors.btnPrimary}}
                                />
                            </TouchableOpacity>
                        </View>
                        {this.props.isModal !== true ?
                            <TouchableOpacity style={styles.proAddToCart} onPress={() => this.addProductToCart()}>
                                <Text style={{color: '#FFF', fontWeight: 'bold'}}>THÊM VÀO GIỎ HÀNG</Text>
                            </TouchableOpacity> : null
                        }
                    </View>
                </View>
                {this.props.isModal === true ?
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:15}}>
                        <TouchableOpacity style={styles.proAddToCart} onPress={() => this.props.submitModal({product: this.props.productDetail, ...this.state})}>
                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>THÊM VÀO GIỎ HÀNG</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.proCloseModal} onPress={() => this.props.closeModal()}>
                            <Text style={{color: '#000', fontWeight: 'bold'}}>BỎ QUA</Text>
                        </TouchableOpacity>
                    </View> : null
                }
            </View>
        )
    }
}
export default ProductAttribute