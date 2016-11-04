import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    list: {
        flex: 1,
        marginTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});


export default styles;
