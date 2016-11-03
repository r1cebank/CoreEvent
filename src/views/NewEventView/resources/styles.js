import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 8,
        alignSelf: 'stretch'
    },
    header: {
        color: Colors.frontColor,
        fontSize: 30,
        fontWeight: '700',
        backgroundColor: 'transparent'
    },
    headerSubtitle: {
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: Colors.frontColor,
        fontSize: 15,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    headerContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    itemSelector: {
        padding: 10,
        paddingTop: 20
    },
    itemSelectorContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.silverSand,
        padding: 10
    },
    itemSelectorTitle: {
        color: Colors.aurometalsaurus,
        fontSize: 16,
        marginLeft: 0
    },
    input: {
        borderBottomWidth: 1,
        marginTop: 10
    },
    inputLabel: {
        color: Colors.aurometalsaurus,
        fontSize: 16,
        marginLeft: 14
    },
    button: {
        borderRadius: 40,
        marginTop: 20
    }
});


export default styles;
