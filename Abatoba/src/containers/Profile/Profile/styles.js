import EStyleSheet from 'react-native-extended-stylesheet';

export default styles = EStyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingVertical: 15,
        paddingRight: 20,
        alignItems: 'center',
    },
    innerLeft: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    innerIcon: {
        minWidth: 24,
    },
    rowText: {
        fontSize: 16,
        marginLeft: 15,
    },
});