import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
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
    listContainer: {
        flex: 4,
        borderColor:
        Colors.grey,
        marginTop: 0,
        marginBottom: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    }
});


export default styles;
