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
    button: {
        color: Colors.frontColor,
        fontWeight: '700'
    },
    header: {
        fontWeight: '700',
        fontSize: 40,
        backgroundColor: 'transparent',
        color: Colors.grey,
        textAlign: 'center',
        marginBottom: 100
    }
});

export default styles;
