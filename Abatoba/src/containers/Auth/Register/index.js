import DateTimePicker from "react-native-modal-datetime-picker";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  Alert,
  BackHandler,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import images from "../../../images";
import { connectAlert } from "../../../components/alertDropdown";
import { translate } from "../../../languages/locale";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import t from "tcomb-form-native";
import ModalSelector from "react-native-modal-selector";
import moment from "moment";
import Toast from "react-native-simple-toast";
import * as Actions from "../../../actions";
import PhotoUpload from "react-native-photo-upload";
import getImagePath from "../../../services/getImagePath";
import TextField from './../../../coreComponent/CustomForm/filed/index';

const Form = t.form.Form;
const Gender = t.enums({
  0: "Male",
  1: "Female"
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      username: "",
      password: "",
      password_confirm: "",
      full_name: "",
      phone: "",
      birthday: "",
      gender: 0,
      email: "",
      address: "",
      invalidField: "",
      avatar: this.props.sUploadedAvatar,
      isDateTimePickerVisible: false
    };
  }

  arrAtt = [
    { key: "username", name: "Tên tài khoản" },
    { key: "password", name: "Mật khẩu" },
    { key: "password_confirm", name: "Mật khẩu xác nhận" },
    { key: "full_name", name: "Họ tên" },
    { key: "phone", name: "Số điện thoại" },
    { key: "birthday", name: "Ngày sinh" },
    { key: "gender", name: "Giới Tính" },
    { key: "address", name: "Địa chỉ" },
    { key: "email", name: "Email" }
  ];

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Đăng ký"
    };
  };

  _showDateTimePicker = () => {
    console.log("_showDateTimePicker", this.state.isDateTimePickerVisible);
    this.setState({ isDateTimePickerVisible: true });
  };

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({
      ...this.state,
      birthday: moment(date).format("YYYY-MM-DD")
    });
    this._hideDateTimePicker();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.props.alertWithType("error", "Error", nextProps.error);
    }
    this.setState({
      avatar: nextProps.sUploadedAvatar || ""
    });
  }

  onFocus() {
    this.setState({
      borderColor: "red"
    });
  }

  onBlur() {
    this.setState({
      borderColor: "#757575"
    });
  }

  _signUpOnPress() {
    invalidField = "";
    state = this.state;
    this.arrAtt.forEach(function(element) {
      if (state[element.key] === "") {
        invalidField += `Bạn chưa điền ${element.name}\n`;
      }
    });
    if (this.state.password !== this.state.password_confirm) {
      invalidField += `Mật khẩu và mật khẩu xác nhận không đúng!\n`;
    }
    if (invalidField !== "") {
      this.setState({ invalidField });
      return;
    }
    this.props.dispatch(Actions.doRegister({ ...this.state }));
  }
  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }
  _uploadAvatar(avatar) {
    let data = {
      uri: avatar.uri,
      name: avatar.fileName,
      type: "image/jpg"
    };
    this.props.dispatch(Actions.doUploadAvatar(data));
  }

  render() {
    let index = 0;
    // change nam: 1, nu: 0
    const data = [{ key: 0, label: "Nam" }, { key: 1, label: "Nữ" }];

    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.container}>
            <View style={styles.uploadphotoWapper}>
              <TouchableOpacity style={styles.uploadphoto}>
                <PhotoUpload
                  onResponse={avatar => {
                    if (avatar) {
                      this._uploadAvatar(avatar);
                    }
                  }}
                >
                  <Image
                    style={styles.avatar}
                    source={
                      this.props.sUserAvatar.length
                        ? { uri: getImagePath(this.props.sUserAvatar) }
                        : images.avatar
                    }
                  />
                </PhotoUpload>
              </TouchableOpacity>
            </View>
            <View style={styles.formgroupWapper}>             
              <View>
                <TextField
                  label="Tài Khoản*"
                  underlineColorAndroid='rgba(0,0,0,0)'
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  ref="userName"
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this._focusNextField('password')}
                  returnKeyType={"next"}
                />
              </View>
              <View>
                <TextField
                  label="Mật khẩu*"
                  value={this.state.password}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  onChangeText={(password) => this.setState({ password })}
                  secureTextEntry={true}
                  ref="password"
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this._focusNextField('password_confirm')}
                  returnKeyType={"next"}
                />
              </View>
              <View>
                <TextField
                  label="Nhập lại mật khẩu*"
                  underlineColorAndroid='rgba(0,0,0,0)'
                  value={this.state.password_confirm}
                  onChangeText={(password_confirm) => this.setState({ password_confirm })}
                  secureTextEntry={true}
                  ref="password_confirm"
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this._focusNextField('full_name')}
                  returnKeyType={"next"}
                />
              </View>
              <View>
                <TextField 
                  underlineColorAndroid='rgba(0,0,0,0)'
                  style={[styles.input, styles.space_left]}
                  label='Họ tên*'
                  autoCapitalize="words"
                  value={this.state.full_name}
                  onChangeText={(full_name) => this.setState({ full_name })}
                  ref="full_name"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this._focusNextField('phone')}
                  returnKeyType={"next"}
                />
              </View>
              <View>
                <TextField 
                   underlineColorAndroid='rgba(0,0,0,0)'
                   style={[styles.input, styles.space_left]}
                   label='Địa chỉ*'
                   autoCapitalize="none"
                   value={this.state.address}
                   onChangeText={(address) => this.setState({ address })}
                   ref="address"
                   blurOnSubmit={false}
                   onSubmitEditing={() => this._focusNextField('phone')}
                   returnKeyType={"next"}
                />
              </View>
              <View>
                <TextField
                  underlineColorAndroid='rgba(0,0,0,0)'
                  style={[styles.input, styles.space_left]}
                  label='Số điện thoại*'
                  value={this.state.phone}
                  onChangeText={(phone) => this.setState({ phone })}
                  ref="phone"
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this._showDateTimePicker()}
                  returnKeyType={"next"}
                />
            
                  <View style={{paddingRight: 220}}>
                    <DateTimePicker
                      mode="date"
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                    />
                    <TouchableOpacity>
                      <TextField
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onFocus={() => this._showDateTimePicker()}
                        style={[styles.input]}
                        label='dd/mm/yyyy*'
                        placeholderTextColor='#757575'
                        value={this.state.birthday}
                      />
                      {/*<View style={styles.birthdayView}><Text style={styles.birthdayText}>dd/mm/yy</Text></View>*/}
                    </TouchableOpacity>
                  </View>

                  <View style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    display: 'flex',
                  }}>
                    <ModalSelector
                      data={data}
                      initValue="Nam"
                      style={styles.modal}
                      accessible={true}
                      scrollViewAccessibilityLabel={'Scrollable options'}
                      cancelButtonAccessibilityLabel={'Cancel Button'}
                      onChange={(option) => {
                        this.setState({ gender: option.key })
                      }}>
                      <TextInput underlineColorAndroid='rgba(0,0,0,0)'
                        style={[styles.input, styles.modalInput]}
                        editable={false}
                        placeholder="Nam"
                        placeholderTextColor='#757575'
                        value={this.state.gender === 0 ? 'Nam' : 'Nữ'}
                      />
                    </ModalSelector>
                  </View>

             
                <TextField
                  underlineColorAndroid='rgba(0,0,0,0)'
                  style={[styles.input, styles.space_left]}
                  label='Email*'
                  autoCapitalize="none"
                  value={this.state.email}
                  onChangeText={(email) => this.setState({ email })}
                  ref="email"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this._signUpOnPress()}
                />
              </View>
              
              <Text style={{ fontWeight: "bold", color: "red" }}>
                {this.state.invalidField}
              </Text>
            </View>
            <View style={[styles.formgroupWapper, styles.formButton]}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => this._signUpOnPress()}
              >
                <Text style={styles.registerText}>
                  {"Đăng ký".toUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  {
                    backgroundColor: "white",
                    borderColor: "#FF9800",
                    borderWidth: 1
                  }
                ]}
                onPress={() => this.props.navigation.goBack(null)}
              >
                <Text style={[styles.registerText, { color: "#FF9800" }]}>
                  {"Quay lại".toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

function mapStateToProps({ nav, auth }) {
  return {
    error: auth.error,
    isFetching: auth.bIsLoading,
    sUserAvatar: auth.oUser.avatar || "",
    sUploadedAvatar: auth.sUploadedAvatar
  };
}

export default connect(
  mapStateToProps,
  null
)(connectAlert(Register));
