import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    titleStyle: {
        color: Colors.grey,
        fontSize: 20
    },
    hiddenRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'red'
    },
    deleteButton: {
        width: 75,
        alignItems: 'center'
    }
});


export default styles;
