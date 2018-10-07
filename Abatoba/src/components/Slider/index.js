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
import colors from './../../configs/colors';
import Swiper from 'react-native-swiper';
import * as Actions from '../../actions';
import FastImage from 'react-native-fast-image';

class Slider extends Component {
    render() {
        let slides = this.props.data;
        return (
            <Swiper
                style={styles.wrapper}
                dot={<View style={styles.slideDot}/>}
                activeDot={<View style={styles.dotActive}/>}
                paginationStyle={styles.slidePagination}
                index = {typeof this.props.seletedIndex !== 'undefined' ? this.props.seletedIndex : 0}
                autoplay={false}>
                {slides.map((slide, index) => (
                    <TouchableOpacity key={index} style={styles.slide} onPress={typeof slide.sli_art_id !== 'undefined' && slide.sli_art_id !== null ? () => this.props.dispatch(Actions.jumpTo('ArticleDetail', {
                            id: slide.sli_art_id,
                        })) : null}>
                        <FastImage
                            style={styles.slideImage}
                            source={{uri: `${slide.sli_image}`}}
                            resizeMode={FastImage.resizeMode.contain}/>
                    </TouchableOpacity>
                ))}
            </Swiper>
        );
    }
}

export default Slider; 