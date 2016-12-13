import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    list: {
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});


export default styles;
