import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image,
    Alert,
    ScrollView,
    Picker,
    Modal,
    TouchableHighlight,
    Button
} from 'react-native';
import * as Actions from "./../../../actions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from './../../../configs/colors';
import Swiper from 'react-native-swiper';
import moment from 'moment';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerDisplayed: false,
            pickerSelection: null,
            selectedValue: null,
            artCateActive: 1,
        }
    }

    togglePicker(open) {
        if (typeof open == 'undefined') {
            open = true;
        }
        this.setState({
            pickerDisplayed: open,
        })
    }

    selectValue(newValue) {
        this.setState({
            selectedValue: newValue
        })
        this.togglePicker(false);
    }

    setActiveTab(item) {
        if (this.state.artCateActive == null) {

        }
    }

    render() {
        let { data, pageName, artcate } = this.props;
        let isListing = typeof this.props.isListing !== 'undefined' && this.props.isListing;
        let defaultValue = (this.state.selectedValue !== null) ? this.state.selectedValue : (typeof artcate !== 'undefined' ? artcate.cate_name : null)
        let HomeCategories = (props) => {
            let { artCateActive } = this.state;
            return (
                <View>
                    <View style={styles.listCateHome}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ artCateActive: data[0] })
                                    this.props.dispatch(Actions.getArticles({ cate_id: data.length > 0 ? this.props.data[0].cate_id : null}));
                                    this.props.onSelect(this.props.data[0]);
                                }}
                                style={[styles.tabBarButton, ((artCateActive === data[0] || artCateActive === 1) ? styles.whenActive : null)]}>
                                <Text style={[styles.tabBarText, ((artCateActive === data[0] || artCateActive === 1) ? styles.whenActiveColor : null)]}>
                                    {data.length > 0 ? data[0].cate_name.toUpperCase() : null}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        this.setState({ artCateActive: data[1] })
                                        this.props.dispatch(Actions.getArticles({ cate_id: data.length > 1 ? this.props.data[1].cate_id : null}))
                                        this.props.onSelect(this.props.data[1]);
                                    }

                                } style={[styles.tabBarButton, (artCateActive === data[1] ? styles.whenActive : null)]}>
                                <Text style={[styles.tabBarText, (artCateActive === data[1] ? styles.whenActiveColor : null)]}>
                                    {data.length > 1 ? data[1].cate_name.toUpperCase() : null}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.btnMore} onPress={() => this.togglePicker()}>
                            <Text style={styles.txtMore}>THÊM</Text>
                            <Ionicons
                                name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
                                size={18}
                                style={{ paddingHorizontal: 5, }}
                                color={colors.textColorSecondary}
                            />
                        </TouchableOpacity>
                    </View>

                    <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
                        <TouchableOpacity onPress={() => this.togglePicker(false)} style={{ flex: 2 }} />
                        <ScrollView style={styles.modalScroll}>
                            <View style={styles.modal}>
                                {(data.length > 0) ? data.map((value, index) => (
                                    <View key={index}>
                                        {index > 1 ?
                                            <TouchableOpacity style={styles.modalItem}
                                                onPress={() => {this.togglePicker(false); this.props.dispatch(Actions.jumpTo('ArticlesLising', { artcate: { ...value } }))}}
                                            >
                                                <Text style={{ color: '#000', fontSize: 16 }}>{value.cate_name}</Text>
                                            </TouchableOpacity>
                                            : null}
                                        {(!!value.cate_childs && value.cate_childs.length > 0) ? value.cate_childs.map((value_child, index) => (
                                            <View key={index}>
                                                <TouchableOpacity style={styles.modalItem}
                                                    onPress={() => {this.togglePicker(false); this.props.dispatch(Actions.jumpTo('ArticlesLising', { artcate: { ...value_child } }))}}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>» {value_child.cate_name}</Text>
                                                </TouchableOpacity>

                                                {(!!value.cate_childs && value_child.cate_childs.length > 0) ? value_child.cate_childs.map((value_childs, index) => (
                                                    <TouchableOpacity key={index} onPress={() => {this.togglePicker(false); this.props.dispatch(Actions.jumpTo('ArticlesLising', { artcate: { ...value_childs } }))}} style={styles.modalItem}>
                                                        <Text style={{ color: '#000', fontSize: 16 }}>»» {value_childs.cate_name}</Text>
                                                    </TouchableOpacity>
                                                )) : null}
                                            </View>
                                        )) : null}
                                    </View>
                                )) : null}
                                <View style={{alignItems: 'center', backgroundColor: '#c5c5c5'}}>
                                    <TouchableOpacity style={styles.modalItem} onPress={() => this.togglePicker(false)}>
                                        <Text style={{ color: '#333', fontSize: 16  }}>Đóng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            )
        }

        let ArticlesListing = () => {
            return (
                <View>
                    <View style={styles.listCate}>
                        <TouchableOpacity style={styles.btnMore} onPress={() => this.togglePicker()}>
                            <Text style={styles.listTxtMore}>{defaultValue}</Text>
                            <Ionicons
                                name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
                                size={18}
                                style={{ paddingHorizontal: 5, }}
                                color={colors.textColorSecondary}
                            />
                        </TouchableOpacity>
                    </View>

                    <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
                        <TouchableOpacity onPress={() => this.togglePicker(false)} style={{ flex: 2 }} />
                        <ScrollView style={styles.modalScroll}>
                            <View style={styles.modal}>
                                {(data.length > 0) ? data.map((value, index) => (
                                    <View key={index}>
                                        <TouchableOpacity onPress={() => {
                                            this.selectValue(value.cate_name)
                                            this.props.dispatch(Actions.getArticles({ cate_id: value.cate_id , isListing: isListing}))
                                        }} style={styles.modalItem}>
                                            <Text style={{ color: '#000', fontSize: 16 }}>{value.cate_name}</Text>
                                        </TouchableOpacity>
                                        {(!!value.cate_childs && value.cate_childs.length > 0) ? value.cate_childs.map((value_child, index) => (
                                            <View key={index}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.selectValue(value_child.cate_name)
                                                        this.props.dispatch(Actions.getArticles({ cate_id: value_child.cate_id, isListing: isListing }))
                                                    }} style={styles.modalItem}>
                                                    <Text style={{ color: '#000', fontSize: 16 }}>» {value_child.cate_name}</Text>
                                                </TouchableOpacity>

                                                {(!!value.cate_childs && value_child.cate_childs.length > 0) ? value_child.cate_childs.map((value_childs, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => {
                                                            this.selectValue(value_childs.cate_name)
                                                            this.props.dispatch(Actions.getArticles({ cate_id: value_childs.cate_id, isListing: isListing }))
                                                        }} style={styles.modalItem}>
                                                        <Text style={{ color: '#000', fontSize: 16 }}>»» {value_childs.cate_name}</Text>
                                                    </TouchableOpacity>
                                                )) : null}
                                            </View>
                                        )) : null}
                                    </View>
                                )) : null}
                                <View style={{alignItems: 'center', backgroundColor: '#c5c5c5'}}>
                                    <TouchableOpacity style={styles.modalItem} onPress={() => this.togglePicker(false)}>
                                        <Text style={{ color: '#333', fontSize: 16 }}>Đóng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            )
        }

        return (
            (pageName == "home") ? <HomeCategories /> : <ArticlesListing />
        );
    }
}
export default Category;