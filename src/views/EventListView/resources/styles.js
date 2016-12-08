import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 1,
        paddingTop: 20,
        alignSelf: 'stretch'
    },
    eventsContainer: {
        paddingBottom: 10,
        flexDirection: 'column'
    },
    cardContainer: {
        backgroundColor: Colors.frontColor,
        marginLeft: 10,
        marginRight: 10,
        margin: 0,
        shadowRadius: 0
    }
});


export default styles;
