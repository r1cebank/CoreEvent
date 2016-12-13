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
        // flex: 8,
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
        paddingTop: 20,
        paddingBottom: 20,
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
        borderBottomWidth: 2,
        borderBottomColor: Colors.silverSand,
        padding: 10
    },
    itemWithSelection: {
        borderBottomWidth: 3,
        borderBottomColor: Colors.infraRed
    },
    itemSelectorTitle: {
        color: Colors.aurometalsaurus,
        fontSize: 16,
        marginLeft: 0
    },
    itemSubtitle: {
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        marginTop: 10
    },
    inputText: {
        paddingLeft: 16
    },
    inputLabel: {
        color: Colors.aurometalsaurus,
        fontSize: 16,
        marginLeft: 14
    },
    dateHeader: {
        color: Colors.aurometalsaurus,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 30
    },
    button: {
        borderRadius: 40,
        marginTop: 20,
        marginBottom: 20
    }
});


export default styles;
