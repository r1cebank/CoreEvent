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
        flexDirection: 'column'
    },
    cardContainer: {
        backgroundColor: Colors.frontColor,
        marginTop: 10,
        margin: 0,
        shadowRadius: 0
    }
});


export default styles;
