import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 350,
        right: 0
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    checkboxContainer: {
        marginBottom: 0,
        flex: 6,
        justifyContent: 'center'
    },
    headerContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 4
    },
    checkBoxStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        marginBottom: 10
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
        textAlign: 'center'
    }
});

export default styles;
