import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    header: {
        fontWeight: '700',
        fontSize: 40,
        backgroundColor: 'transparent',
        color: Colors.frontColor,
        textAlign: 'center'
    },
    signupButton: {
        color: Colors.frontColor,
        fontWeight: '700'
    },
    loginButton: {
        color: Colors.frontColor,
        fontWeight: '700'
    },
    icon: {
        resizeMode: 'cover',
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 30
    }
});

export default styles;
