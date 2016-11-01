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
        flex: 6,
        alignSelf: 'stretch'
    },
    headerContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center'
    }
});


export default styles;
