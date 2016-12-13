import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    list: {
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categoryItemText: {
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    },
    leftItem: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 5
    },
    rightItem: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 10,
        marginBottom: 5
    },
    categoryItem: {
        width: (width / 2) - 30,
        padding: 10,
        margin: 10,
        height: 100,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default styles;
