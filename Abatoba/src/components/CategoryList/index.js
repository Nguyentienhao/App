import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    ActivityIndicator
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Actions from "../../actions";
import * as Constants from "../../configs/constants";
import getImagePath from '../../services/getImagePath';
import {translate} from '../../languages/locale'
import SwipeableViews from 'react-swipeable-views-native';
import FastImage from 'react-native-fast-image';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            updateIndexInterval: null
        }
    }

    renderListCategory(categories, limit) {
        let arrCategoryTotal = [];
        if(!!categories){
            let tmpCategories = categories.slice();        
            do {
                arrCategoryTotal.push(tmpCategories.splice(0, limit));
            } while (tmpCategories.length > 0);
        }
        return arrCategoryTotal;
    }

    render() {
        let categories = this.props.aCategories;
        let pageName = this.props.pageName;

        let CategoryItem = (props) => {
            return (
                <View style={styles.cateItemHolder}>
                    <TouchableOpacity style={styles.cateItem} key={props.cate_id}
                                    onPress={() => this.props.dispatch(Actions.jumpTo('CategoryDetail', {category: props}))}>
                        <FastImage
                            source={(props.cate_image) ? {uri: getImagePath(props.cate_image)} : require('../../images/default.png')}
                            style={styles.cateItemImage}/>
                        <View style={styles.cateItemName}>
                            <Text numberOfLines={2} ellipsizeMode={'tail'}
                                style={styles.cateItemNameText}>{props.cate_name.toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        };
        let ChildItem = (props) => {
            return (
                <TouchableOpacity style={styles.cateChildItem} key={props.cate_id}
                                  onPress={() => this.props.dispatch(Actions.jumpTo('CategoryDetail', {category: props}))}>
                    <FastImage
                        source={(props.cate_image) ? {uri: getImagePath(props.cate_image)} : require('../../images/default.png')}
                        style={styles.cateChildItemImage}/>
                    <View style={styles.cateChildItemName}>
                        <Text numberOfLines={2} ellipsizeMode={'tail'}
                              style={styles.cateChildItemNameText}>{props.cate_name}</Text>
                    </View>
                </TouchableOpacity>
            )
        };
        let updateIndex = () => {
            if (categories.length) {
                if (!this.state.updateIndexInterval) {
                    let component = this;
                    let updateIndexInterval = setInterval(function () {
                        component.setState({activeIndex: (component.state.activeIndex + 1) % Math.ceil(categories.length / 3)})
                    }, 10000);
                    this.setState({
                        updateIndexInterval
                    })
                }
            }
        };
        let HomeCategoryList = () => {
            return (
                <View key={'home-categories'} style={styles.section}>
                    <View style={styles.cateSectionHeader}>
                        <TouchableOpacity>
                            <Text style={styles.cateTabBarButton}>Danh mục</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[styles.cateTabBarButton, styles.cateViewMore]}
                                  onPress={() => this.props.dispatch(Actions.jumpTo('Categories'))}
                            >XEM THÊM</Text>
                        </TouchableOpacity>
                    </View>
                    {!categories.length ? (
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingVertical: 12
                        }}>
                            <Text
                                style={{textAlign: 'center'}}>{this.props.isFetching ? translate('Vui lòng đợi...') : translate('Vui lòng đợi...')}</Text>
                        </View>
                    ) : null}
                    <SwipeableViews index={this.state.activeIndex}>
                        {this.renderListCategory(categories, 3).map((categoriesItem, index) => (
                            <View key={index}>
                                <View style={styles.cateList}>
                                    {categoriesItem.map(category => (
                                        <CategoryItem key={category.cate_id} {...category} />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </SwipeableViews>
                </View>
            )
        };
        let AllCategoryList = () => {
            return (
                <View key={'all-categories'} style={{paddingTop:10}}>
                    {!categories.length ? (
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingVertical: 12
                        }}>
                            <Text
                                style={{textAlign: 'center'}}>{this.props.isFetching ? translate('Vui lòng đợi...') : translate('Không tìm thấy danh mục nào.')}</Text>
                        </View>
                    ) : null}
                    <View index={this.state.activeIndex}>
                        {this.renderListCategory(categories, 3).map(categoriesItem => (
                            <View key={categoriesItem.length ? categoriesItem[0].cate_id : 0}>
                                <View style={styles.cateList}>
                                    {categoriesItem.map(category => (
                                        <CategoryItem key={category.cate_id} {...category} />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )
        };
        let ChildCategoryList = () => {
            return (
                <View key={'child-categories'} style={{paddingTop: 10}}>
                    {!!categories ? (
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingVertical: 12
                        }}>
                            <Text
                                style={{textAlign: 'center'}}>{this.props.isFetching ? translate('Vui lòng đợi...') : translate('Không tìm thấy danh mục nào.')}</Text>
                        </View>
                    ) : null}
                    <View index={this.state.activeIndex}>
                        {this.renderListCategory(categories, 2).map(categoriesItem => (
                            <View key={categoriesItem.length ? categoriesItem[0].cate_id : 0}>
                                <View style={styles.cateChildList}>
                                    {categoriesItem.map(category => (
                                        <ChildItem key={category.cate_id} {...category} />
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )
        };
        if (pageName == 'home') {
            updateIndex();
        }
        return (
            (pageName == 'home') ? <HomeCategoryList/> :
                ((pageName == 'child') ? <ChildCategoryList/> : <AllCategoryList/>)
        );
    }
}

export default CategoryList;