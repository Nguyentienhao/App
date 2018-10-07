import React, {Component} from 'react';
import {Button, Image, Text, TouchableOpacity, View, ListView, Alert, BackHandler, ScrollView,TextInput} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../configs/colors';
import ModalSelector from 'react-native-modal-selector'
import {getCurrentLanguage,translate} from '../../../languages/locale'
import Toast from "react-native-simple-toast";
import * as Actions from '../../../actions'

class Profile extends Component {

    constructor (props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        /*TODO: Add more items here */
        this.state = {

        };
    }

    static navigationOptions = ({ navigation }) => {

        return {
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name={"md-person"}
                    size={26}
                    style={{ color: tintColor }}
                />
            ),
            swipeEnabled: false,
            title: translate('Settings'),
            tabBarLabel: null,
        }
    };

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentDidMount () {
    }

    renderLanguagePicker() {
        const languages = [
            { key: 'en', label: 'English' },
            { key: 'vi', label: 'Tiếng Việt' },
        ];
        let currentLanguage;
        languages.forEach(language => {(language.key == this.props.language) && (currentLanguage = language) });

        let selectLanguage = (language) => {
            this.props.dispatch(Actions.setCurrentLanguage(language.key));
            Toast.show(language.label);
        };


        return (
            <ModalSelector
                data={languages}
                cancelText={translate('Cancel')}
                onChange={(option )=> selectLanguage(option)} >
                <View style={styles.rowContainer}>
                    <View style={styles.innerLeft}>
                        <Ionicons
                            name={'ios-globe'}
                            size={26}
                            style={[{ color: colors.inactiveTintColor },styles.innerIcon]}
                        />
                        <Text style={styles.rowText}>
                            {translate('Language')}
                        </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Text>{currentLanguage.label}</Text>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={26}
                            style={{ color: colors.inactiveTintColor, fontSize: 22, marginLeft: 12}}
                        />
                    </View>
                </View>
            </ModalSelector>
        );
    }


    render () {
        return (
            <ScrollView
                style={styles.container}
            >
                {this.renderLanguagePicker()}
            </ScrollView>
        )
    }
}

function mapStateToProps ({nav, auth, ui}) {
    return {
        language: ui.language
    }
}

export default connect(mapStateToProps, null)(connectAlert(Profile));
