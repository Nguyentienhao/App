import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import colors from './../../configs/colors';

class StatusBarBackground extends Component {
    render() {
        let {bgColor} = this.props;
        return (
            <View style={[{ backgroundColor: bgColor ? bgColor : colors.bgPrimary },styles.statusBarBackground]}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 20 : 0, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
    }
})

export default StatusBarBackground;