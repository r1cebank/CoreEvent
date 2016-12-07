import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    eventsContainer: {
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        flexDirection: 'column'
    }
});


export default styles;
