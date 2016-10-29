import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 300,
        right: 0
    },
    checkBoxStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0
    },
    checkboxText: {
        fontSize: 12
    },
    button: {
        color: Colors.frontColor,
        fontWeight: '700'
    },
    header: {
        fontWeight: '700',
        fontSize: 40,
        backgroundColor: 'transparent',
        color: Colors.frontColor,
        textAlign: 'center',
        marginBottom: 80
    }
});

export default styles;
