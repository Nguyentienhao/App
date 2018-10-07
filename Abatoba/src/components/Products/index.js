import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ListView,
    StyleSheet,
    Platform,
    Image,
    Alert
} from 'react-native';
import Button from 'react-native-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import SwipeableViews from 'react-swipeable-views-native';
import colors from './../../configs/colors';
import * as Actions from "../../actions";
import getImagePath from "./../../services/getImagePath";
import {formatMoney, currencySymbol} from '../../services/format';
import FastImage from 'react-native-fast-image';

class Products extends Component {
    constructor(props) {
        super(props);
    }

    paginateList(items, limit) {
        let pages = [];
        while (items.length) {
            pages.push(items.splice(0, limit));
        }
        return pages;
    }

    _processProductInOrder = (products) => {
        return products.map((product) => {
            return {
                pro_id: product.billdetail_pro_id,
                pro_main_image: product.billdetail_pro_image,
                pro_name: product.billdetail_pro_name,
                cart_amount: product.billdetail_quantity,
                cart_color: product.billdetail_pro_color,
                cart_size: product.billdetail_pro_size,
                pro_price_after_sale_off: product.billdetail_discount > 0 ? product.billdetail_price - product.billdetail_discount : product.billdetail_price,
                pro_price: product.billdetail_price,
                pro_is_sale_off: product.billdetail_discount > 0
            }
        })
    }

    render() {
        let products = this.props.data,
            view = this.props.view || 'grid',
            page = this.props.page || null;
        if (page == 'history') {
            products = this._processProductInOrder(products);
        }

        let pressTab = this.props.pressTab;
        let ProductItem = (props) => (
            <TouchableOpacity key={props.pro_id} style={styles.productItem}
                              onPress={() => this.props.dispatch(Actions.jumpTo('ProductDetail', {
                                  id: props.pro_id,
                              }))}
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.productItemImage}
                    source={props.pro_main_image ? {uri: getImagePath(props.pro_main_image)} : ''}
                />
                <View style={styles.productItemInfo}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                          style={styles.productItemName}>{props.pro_name}</Text>
                    <View style={styles.productItemRow}>
                        <Text style={styles.productItemID}>ID: {props.pro_id}</Text>
                        <View style={styles.productItemButton}>
                            <Button
                                style={styles.productItemButton}
                                onPress={() => this.props.showModal(props)}
                            >
                                <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
                                    size={30}
                                    color={colors.btnPrimary}
                                />
                            </Button>
                        </View>
                    </View>
                    {props.pro_is_sale_off == false ?
                        <Text style={styles.proFinalPrice}>{formatMoney(props.pro_price, 0)}đ</Text> :
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.proNormalPrice}>{formatMoney(props.pro_price, 0)}đ</Text>
                            <Text style={styles.proFinalPrice}>{formatMoney(props.pro_price_after_sale_off, 0)}đ</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        );
        let ProductItemListView = (props) => (
            <TouchableOpacity key={props.pro_id} style={styles.productItemListView}
                              onPress={() => this.props.dispatch(Actions.jumpTo('ProductDetail', {
                                  id: props.pro_id,
                              }))}
            >
                <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.productItemImageListView}
                    source={(page === 'cart' && props.cart_image) ? {uri: props.cart_image} : (props.pro_main_image ? {uri: getImagePath(props.pro_main_image)} : '')}
                />
                <View style={page === 'history' ? styles.productHistoryInfoListView : styles.productItemInfoListView}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                          style={styles.productItemNameListView}>{props.pro_name}</Text>
                    <View>
                        <View style={styles.productItemRowListView}>
                            {page === 'cart' || page == 'history' ?
                                <View>
                                    <Text style={styles.productItemID}>Số lượng: {props.cart_amount}</Text>
                                    {props.cart_color.length ?
                                        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}><Text
                                            style={[styles.productItemID, {paddingRight: 5}]}>Màu
                                            sắc: </Text>{page == 'history' ?
                                            <Text style={styles.productItemID}>{props.cart_color}</Text> : <View
                                                style={[{backgroundColor: `${props.cart_color}`}, styles.proAttrCircle]}/>}
                                        </View> : null}
                                    {props.cart_size.length ?
                                        <Text style={styles.productItemID}>Size: {props.cart_size}</Text> : null}
                                </View>
                                :
                                <Text style={styles.productItemID}>ID: {props.pro_id}</Text>
                            }
                            {props.pro_is_sale_off == false ?
                                <Text style={styles.proFinalPrice}>{formatMoney(props.pro_price, 0)}đ</Text> :
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.proNormalPrice}>{formatMoney(props.pro_price, 0)}đ</Text>
                                    <Text
                                        style={styles.proFinalPrice}>{formatMoney(props.pro_price_after_sale_off, 0)}đ</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                {page !== 'history' ?
                    <View style={styles.productItemButtonListView}>
                        <Button
                            style={[{padding: 5}, styles.productItemButton]}
                            onPress={page === 'cart' ? () => this.props.removeFromCart(props) : () => this.props.showModal(props)}
                        >
                            <Ionicons
                                name={Platform.OS === 'ios' ? (page === "cart" ? 'ios-remove-circle-outline' : 'ios-add-circle') : (page === "cart" ? 'md-remove-circle' : 'md-add-circle')}
                                size={30}
                                color={page === "cart" ? '#333' : colors.btnPrimary}
                            />
                        </Button>
                    </View> : null}
            </TouchableOpacity>
        );

        let ProductGrid = () => {
            return (
                <View style={styles.productsListing}>
                    <SwipeableViews>
                        {this.paginateList([...products], 4).map((page, index) => (
                            <View key={index} style={styles.productsSwipeable}>
                                {page.slice(0, 5).map((product, index) => (
                                    <ProductItem key={index} {...product} />
                                ))}
                            </View>
                        ))}
                    </SwipeableViews>
                    <TouchableOpacity style={styles.homeViewAll}
                                      onPress={() => this.props.dispatch(Actions.jumpTo('HomeSearch', {
                                          homeSearchType: this.props.homeSearch || 'New',
                                      }))}><Text style={styles.homeViewAllText}>Xem tất
                        cả</Text></TouchableOpacity>
                </View>
            )
        }

        let ProductList = () => {
            return (
                <View>
                    {products.map((product, index) => (
                        <ProductItemListView key={index} {...product} />
                    ))}
                </View>
            )
        }
        return (
            (view == 'grid') ? <ProductGrid/> : <ProductList/>
        );
    }
}

export default Products;