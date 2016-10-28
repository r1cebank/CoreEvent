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
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        marginBottom: 80
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
        textAlign: 'center',
        marginBottom: 150
    },
    signupButton: {
        color: Colors.grey,
        fontWeight: '700'
    },
    loginButton: {
        color: Colors.frontColor,
        fontWeight: '700'
    }
});

export default styles;
