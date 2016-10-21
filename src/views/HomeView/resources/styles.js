import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        alignSelf: 'stretch'
    },
    carousel: {
        height: 100
    }
});


export default styles;
