import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    wrapper: {
        padding: 5
    },
    titleStyle: {
        color: Colors.grey,
        fontSize: 20,
        paddingLeft: 10
    },
    iconStyle: {
        color: Colors.infraRed,
        fontSize: 30
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'center'
    },
    listContainer: {
        flex: 4,
        borderColor:
        Colors.grey,
        marginTop: 0,
        marginBottom: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    avatarContainer: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        height: 100,
        width: 100
    },
    avatarImage: {
        flexDirection: 'row',
        height: 80,
        width: 80,
        resizeMode: 'cover',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameStatContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    statText: {
        flex: 1,
        backgroundColor: 'transparent',
        color: Colors.frontColor,
        textAlign: 'center'
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        paddingTop: 10
    },
    usernameText: {
        backgroundColor: 'transparent',
        fontSize: 20,
        color: Colors.frontColor,
        textAlign: 'center',
        fontWeight: '700'
    }
});


export default styles;
