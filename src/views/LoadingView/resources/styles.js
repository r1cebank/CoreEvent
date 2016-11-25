import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.grey,
        marginTop: 20,
        opacity: 1
    }
});

export default styles;
