import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.infraRed,
        margin: 10,
        marginBottom: 0,
        borderRadius: 10
    },
    textContainer: {
        flex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },
    message: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.infraRed
    },
    buttonsContainer: {
        flex: 3,
        flexDirection: 'row'
    }
});


export default styles;
