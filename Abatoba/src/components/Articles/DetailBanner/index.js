import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import moment from 'moment';
import getImagePath from "../../../services/getImagePath";
import FastImage from 'react-native-fast-image';
class DetailBanner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {news} = this.props;
        return (
            <View>
                <View style={styles.banner}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.image}
                        source={news.art_image ? { uri: getImagePath(news.art_image) } : ''}
                    />
                    <View style={styles.banner_info}>
                        <Text style={styles.title}>{news.art_name}</Text>
                        <View style={styles.time}>
                            <Text style={styles.time_number}>{moment(`${news.art_created_datetime}`).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.time_number}>ID: {news.art_id}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default DetailBanner;