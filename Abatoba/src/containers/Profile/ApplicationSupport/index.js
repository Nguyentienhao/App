import React, {Component} from 'react';
import {Button, Image, Text, TouchableOpacity, View, ListView, Alert, BackHandler} from 'react-native';
import styles from './styles';
import {connect} from "react-redux";
import {connectAlert} from '../../../components/alertDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../configs/colors';
import {jumpTo} from "../../../actions";

class ApplicationSupport extends Component {

    constructor (props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        /*TODO: Add more items here */
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    key: 1,
                    items: [
                        {
                            icon: 'ios-information-circle-outline',
                            label: 'Term of service',
                            routeName: 'SupportDetail',
                            name:'about'
                        },
                        {
                            icon: 'md-ribbon',
                            label: 'Security',
                            routeName: 'SupportDetail',
                            name:'security'
                        },
                        {
                            icon: 'ios-card',
                            label: 'Payment',
                            routeName: 'SupportDetail',
                            name:'payment'
                        }
                    ]
                },
            ]),
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
            title: 'Application Support',
            tabBarLabel: null,
        }
    };

    handleBackButtonClick() {
        Alert.alert(
            'Quit App',
            'Are you sure want to quit Abatoba?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false }
        );
        // this.props.navigation.goBack(null);
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


    render () {
        const Row = (props) => (
            <TouchableOpacity style={styles.rowContainer} onPress={() => this.props.navigation.dispatch(jumpTo(props.routeName,{route:props}))}>
                <View style={styles.innerLeft}>
                    <Ionicons
                        name={props.icon}
                        size={26}
                        style={[{ color: colors.inactiveTintColor },styles.innerIcon]}
                    />
                    <Text style={styles.rowText}>
                        {props.label}
                    </Text>
                </View>
                <Ionicons
                    name={'ios-arrow-forward'}
                    size={26}
                    style={{ color: colors.inactiveTintColor, fontSize: 22, }}
                />
            </TouchableOpacity>
        );

        const Group = (props) => (
            <View>
                {props.items.map((item) => <Row key={item.routeName} {...item} />)}
            </View>
        );

        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <Group {...data} />}
            />
        )
    }
}

function mapStateToProps ({nav, auth}) {
    return {
    }
}

export default connect(mapStateToProps, null)(connectAlert(ApplicationSupport));
