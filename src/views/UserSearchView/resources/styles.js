import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    button: {
        borderRadius: 40,
        marginTop: 20,
        marginBottom: 20
    },
    input: {
        borderBottomWidth: 0,
        margin: 10
    }
});


export default styles;
