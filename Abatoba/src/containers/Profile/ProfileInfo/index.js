import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    BackHandler,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import images from "../../../images";
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from "react-native-loading-spinner-overlay";
import HeaderSearch from '../../HeaderSearch';
import moment from "moment";
import {translate} from "../../../languages/locale";
import _ from 'lodash';
import PhotoUpload from 'react-native-photo-upload';
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalSelector from 'react-native-modal-selector';
import StatusBarBackground from '../../../components/StatusBarBackground';
import * as Actions from '../../../actions';
import getImagePath from "../../../services/getImagePath";
import Modal from "react-native-modal";


class ProfileInfo extends Component {
    
    constructor(props) {
        super(props);
        
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isEdit: false,
            isDateTimePickerVisible: false,
            "username": "",
            "full_name": "",
            "phone": "",
            "birthday": "",
            "gender": 'Nam',
            "email": "",
            "address": "",
            "invalidField": "",
            "avatar": this.props.sUploadedAvatar,
            isModalVisible: false,
            password: "",
            password_confirm: "",
            old_password: ""
        };
    }
    
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            "avatar": nextProps.sUploadedAvatar || ''
        })
        if (nextProps.isChangePassSuccess !== this.props.isChangePassSuccess && nextProps.isChangePassSuccess) {
            this._closeModal();
        }
    }
    
    static navigationOptions = ({navigation}) => {
        
        return {
            title: 'Profile Info',
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={"md-person"}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            swipeEnabled: false
        }
    };
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        alertWithType: PropTypes.func,
    };
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        
    }
    
    _focusNextField(nextField) {
        this.refs[nextField].focus();
    }
    
    componentDidMount() {
    
    }
    
    user = {...this.props.oUser};
    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});
    
    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});
    
    _handleDatePicked = date => {
        this.setState({
            ...this.state,
            birthday: moment(date).format("YYYY-MM-DD")
        });
        this._hideDateTimePicker();
    };
    
    _onClickEdit() {
        this.setState(this.user);
        this.setState({birthday: moment(this.user.birthday).format("YYYY-MM-DD")});
        this.setState({isEdit: !this.state.isEdit});
        this.user = this.state;
    }
    
    _onSubmitEdit() {
        this.props.dispatch(Actions.updateUserProfile(this.state));
        this.setState({isEdit: !this.state.isEdit});
        this.user = this.state;
    }
    
    _onClickChangePass() {
        this.setState({
            isModalVisible: true
        });
    }
    
    _uploadAvatar(avatar) {
        let data = {
            uri: avatar.uri,
            name: avatar.fileName,
            type: 'image/jpg'
        };
        this.props.dispatch(Actions.doUploadAvatar(data));
    }
    _closeModal = () => {
        this.setState({
            isModalVisible: false,
            password: "",
            password_confirm: "",
            old_password: ""
        });
    };
    _submitModal = () => {
        let {password, old_password, password_confirm} = this.state;
        if (password_confirm === "" || password === "" || old_password === "") {
            Alert.alert(
                "Xảy ra lỗi",
                "Vui lòng nhập đầy đủ thông tin", [], {cancelable: true})
            return false;
        }
        if (password_confirm !== password) {
            Alert.alert(
                "Xảy ra lỗi",
                "Xác nhận mật khẩu mới không khớp", [], {cancelable: true})
            return false;
        }
        this.props.dispatch(Actions.doChangePassword({password,old_password,password_confirm}));
    };
    render() {
        return (
            
            _.isEmpty(this.props.oUser) ?
                <View style={{marginTop: 30}}><Text style={{textAlign: "center"}}>{translate("User not found!")}</Text></View> :
                <View style={{flex: 1}}>
                    <View>
                        <Modal
                            isVisible={this.state.isModalVisible}
                            onBackdropPress={this._closeModal}
                            backdropOpacity={0.4}
                        >
                            <View style={styles.modalHolder}>
                                <View style={{flexDirection: 'row',justifyContent: 'center', marginTop:10, marginBottom: 10}}>
                                    <Text style={{fontSize: 20, fontWeight: "700"}}>Đổi Mật Khẩu</Text>
                                </View>
                                <View style={styles.modalContent}>
                                    <TextInput
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder='Mật khẩu cũ*'
                                        style={styles.inputChangePass}
                                        placeholderTextColor='#757575'
                                        ref="old_password"
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        value={this.state.old_password}
                                        onChangeText={(old_password) => this.setState({old_password})}
                                        onSubmitEditing={() => this._focusNextField('password')}
                                    />
                                    <TextInput
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder='Mật khẩu mới*'
                                        style={styles.inputChangePass}
                                        placeholderTextColor='#757575'
                                        ref="password"
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        value={this.state.password}
                                        onChangeText={(password) => this.setState({password})}
                                        onSubmitEditing={() => this._focusNextField('password_confirm')}
                                    />
                                    <TextInput
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder='Xác nhận mật khẩu mới*'
                                        style={styles.inputChangePass}
                                        placeholderTextColor='#757575'
                                        ref="password_confirm"
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        value={this.state.password_confirm}
                                        onChangeText={(password_confirm) => this.setState({password_confirm})}
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:15, backgroundColor: "white",marginBottom: 15}}>
                                    <TouchableOpacity style={styles.buttonChangePass} onPress={() => this._submitModal()} disabled={this.props.isProcessingPassword}>
                                        <Text style={{color: '#FFF', fontWeight: 'bold'}}>Cập Nhật</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonCancelChangePass} onPress={() => this._closeModal()}>
                                        <Text style={{color: '#000', fontWeight: 'bold'}}>Hủy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <StatusBarBackground/>
                    <HeaderSearch hasBack={true}/>
                    <Spinner visible={this.props.isFetching} color="#0074D9"/>
                    <ScrollView style={styles.container}
                                keyboardShouldPersistTaps={'handled'}
                    >
                        <View style={styles.uploadphotoWapper}>
                            {this.state.isEdit ?
                                
                                <TouchableOpacity
                                    style={styles.uploadphoto}
                                >
                                    <PhotoUpload
                                        onResponse={avatar => {
                                            console.log('avatar:', avatar);
                                            if (avatar && !avatar.didCancel) {
                                                this._uploadAvatar(avatar);
                                            }
                                        }}
                                    >
                                        <Image
                                            style={styles.avatar}
                                            source={this.props.sUserAvatar.length ? {uri: getImagePath(this.props.sUserAvatar)} : images.avatar}
                                        />
                                    </PhotoUpload>
                                </TouchableOpacity>
                                :
                                <View
                                    style={styles.uploadphoto}
                                >
                                    <Image
                                        style={styles.avatar}
                                        source={this.props.sUserAvatar.length ? {uri: getImagePath(this.props.sUserAvatar)} : images.avatar}
                                    />
                                </View>
                            }
                        </View>
                        <View style={styles.formGroupButton}>
                            <View style={[styles.formButton, this.state.isEdit ? {display: 'none'} : null]}>
                                <TouchableOpacity style={styles.updateInfoButton} onPress={() => this._onClickEdit()}>
                                    <Text style={styles.registerText}>{'Cập nhật thông tin'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.formButton, this.state.isEdit ? {display: 'none'} : null]}>
                                <TouchableOpacity style={styles.changePassButton}
                                                  onPress={() => this._onClickChangePass()}>
                                    <Text style={styles.changePassButtonText}>{'Thay đổi mật khẩu'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/*View Edit*/}
                        
                        <View style={[styles.formgroupWapper, !this.state.isEdit ? {display: 'none'} : null]}>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'person'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <TextInput
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={[styles.input, styles.space_left]}
                                    placeholder='Tài khoản*'
                                    placeholderTextColor='#757575'
                                    ref="user_name"
                                    autoCapitalize="none"
                                    value={this.state.username}
                                    onChangeText={(username) => this.setState({username})}
                                    onSubmitEditing={() => this._focusNextField('full_name')}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'font-download'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <TextInput
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={[styles.input, styles.space_left]}
                                    placeholder='Họ tên*'
                                    ref="full_name"
                                    onSubmitEditing={() => this._focusNextField('phone')}
                                    placeholderTextColor='#757575'
                                    autoCapitalize="words"
                                    value={this.state.full_name}
                                    onChangeText={(full_name) => this.setState({full_name})}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'stay-current-portrait'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <TextInput
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={[styles.input, styles.space_left]}
                                    placeholder='Số điện thoại*'
                                    placeholderTextColor='#757575'
                                    ref="phone"
                                    autoCapitalize="none"
                                    value={this.state.phone}
                                    onChangeText={(phone) => this.setState({phone})}
                                    onSubmitEditing={() => this._showDateTimePicker()}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'cake'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                
                                <View style={styles.birthdayWapper}>
                                    <View style={styles.birthdayFormGroup}>
                                        <DateTimePicker
                                            mode="date"
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this._handleDatePicked}
                                            onCancel={this._hideDateTimePicker}
                                        />
                                        
                                        <TouchableOpacity>
                                            <TextInput
                                                underlineColorAndroid='rgba(0,0,0,0)'
                                                onFocus={() => this._showDateTimePicker()}
                                                style={[styles.input]}
                                                placeholder='dd/mm/yyyy*'
                                                placeholderTextColor='#757575'
                                                value={this.state.birthday}
                                            />
                                            {/*<View style={styles.birthdayView}><Text style={styles.birthdayText}>dd/mm/yy</Text></View>*/}
                                        </TouchableOpacity>
                                    </View>
                                    
                                    <View style={styles.birthdayFormGroup}>
                                        <ModalSelector
                                            data={[
                                                {key: 0, label: 'Nam'},
                                                {key: 1, label: 'Nữ'}
                                            ]}
                                            initValue="Nam"
                                            style={styles.modal}
                                            accessible={true}
                                            scrollViewAccessibilityLabel={'Scrollable options'}
                                            cancelButtonAccessibilityLabel={'Cancel Button'}
                                            onChange={(option) => {
                                                this.setState({gender: option.key})
                                            }}>
                                            <TextInput
                                                underlineColorAndroid='rgba(0,0,0,0)'
                                                style={[styles.input, styles.modalInput]}
                                                editable={false}
                                                placeholder="Nam"
                                                placeholderTextColor='#757575'
                                                value={this.state.gender === 0 ? 'Nam' : 'Nữ'}
                                            />
                                        </ModalSelector>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'home'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <TextInput
                                    style={[styles.input, styles.space_left]}
                                    placeholder='Địa chỉ'
                                    autoCapitalize="none"
                                    placeholderTextColor='#757575'
                                    onSubmitEditing={() => this._focusNextField('email')}
                                    value={this.state.address}
                                    onChangeText={(address) => this.setState({address})}
                                />
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'email'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <TextInput
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    style={[styles.input, styles.space_left, {marginBottom: 30}]}
                                    placeholder='Email*'
                                    placeholderTextColor='#757575'
                                    value={this.state.email}
                                    ref="email"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this._onSubmitEdit()}
                                    onChangeText={(email) => this.setState({email})}
                                />
                            </View>
                            <Text style={{fontWeight: "bold", color: "red"}}>{this.state.invalidField}</Text>
                            <View style={[styles.formgroupWapper, styles.formButton]}>
                                <TouchableOpacity style={styles.updateInfoButton} onPress={() => this._onSubmitEdit()}>
                                    <Text style={styles.registerText}>{'Lưu thay đổi'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.formgroupWapper, styles.formButton, {marginBottom: 50}]}>
                                <TouchableOpacity style={styles.changePassButton} onPress={() => this._onClickEdit()}>
                                    <Text style={styles.changePassButtonText}>{'Hủy bỏ'.toUpperCase()}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        
                        {/*View Info*/}
                        
                        <View style={[styles.formgroupWapper, this.state.isEdit ? {display: 'none'} : null]}>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'person'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <Text
                                    style={[styles.inputView, styles.space_left]}
                                >{this.user.username}</Text>
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'font-download'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <Text
                                    style={[styles.inputView, styles.space_left]}
                                >{this.user.full_name}</Text>
                            
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'stay-current-portrait'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <Text
                                    style={[styles.inputView, styles.space_left]}
                                >{this.user.phone}</Text>
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'cake'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                
                                <View style={styles.birthdayWapper}>
                                    <View style={styles.birthdayFormGroup}>
                                        <Text
                                            style={[styles.inputView]}
                                        >{moment(this.user.birthday).format("DD-MM-YYYY")}</Text>
                                    </View>
                                    
                                    <View style={styles.birthdayFormGroup}>
                                        <Text
                                            style={[styles.inputView, styles.modalInput]}
                                        >{this.state.gender ? this.state.gender : 'Nam'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'home'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                
                                <Text
                                    style={[styles.inputView, styles.space_left]}
                                >{this.user.address}</Text>
                            </View>
                            <View style={styles.formGroup}>
                                <MaterialIcons
                                    name={'email'}
                                    style={styles.icon}
                                ></MaterialIcons>
                                <Text
                                    style={[styles.inputView, styles.space_left, {marginBottom: 30}]}
                                >{this.user.email}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
        )
    }
}

function mapStateToProps({nav, auth}) {
    return {
        oUser: auth.oUser,
        sUserAvatar: auth.oUser.avatar || '',
        sUploadedAvatar: auth.sUploadedAvatar,
        isProcessingPassword: auth.changePass.isProcessing,
        isChangePassSuccess: auth.changePass.isSuccess
    }
}

export default connect(mapStateToProps, null)(connectAlert(ProfileInfo));
