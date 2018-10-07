import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image,
    Alert
} from 'react-native';
import Button from 'react-native-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from './../../../configs/colors';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import * as Actions from '../../../actions';
import getImagePath from "../../../services/getImagePath";
import FastImage from 'react-native-fast-image';

class Items extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let newsList = this.props.data;
        return (
            <View style={styles.newsListing}>
                {typeof newsList !== 'undefined' ? newsList.map((newsItem, index) => {
                    {
                        var date = moment(`${newsItem.art_created_date}`).format('DD/MM/YYYY')
                    }
                    return (
                        <TouchableOpacity key={index} style={styles.newsItem}
                                          onPress={() => this.props.dispatch(Actions.jumpTo('ArticleDetail', {
                                              id: newsItem.art_id,
                                          }))}
                        >
                            <FastImage
                                style={styles.newsImage}
                                source={newsItem.art_image ? { uri: getImagePath(newsItem.art_image) } : ''}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <View style={styles.newsInfo}>
                                <Text numberOfLines={1} ellipsizeMode={'tail'}
                                      style={styles.newsTitle}>{newsItem.art_name}</Text>
                                <View style={styles.newsDateId}>
                                    <Text style={{color: colors.textColorSecondary}}>{date}</Text>
                                    <Text style={{color: colors.textColorSecondary}}>{`ID: #${newsItem.art_id}`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }): <Text style={{textAlign: 'center', padding: 10, fontSize: 14}}>Không có bài viết nào.</Text> }
                {/* <TouchableOpacity onPress={()=>this.props.dispatch(Actions.jumpTo('ArticlesLising',{artcate: this.props.artcate}))} style={styles.newsViewAll}><Text style={styles.newsViewAllText}>Xem tất
                    cả</Text></TouchableOpacity> */}
            </View>
        );
    }
}

export default Items;