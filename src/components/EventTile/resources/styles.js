import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    eventCard: {
        flex: 1,
        borderRadius: 20,
        padding: 10
        // borderColor: Colors.secondary
    },
    imageStyle: {
        borderRadius: 20
    },
    timeVenueText: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        color: Colors.frontColor
    },
    eventCardCTA: {
        borderWidth: 1,
        borderColor: Colors.frontColor,
        borderRadius: 40,
        marginLeft: 0,
        marginRight: 10,
        marginBottom: 0,
        marginTop: 10
    },
    etcIconStyle: {
        marginRight: 0
    },
    timeVenueSecondaryText: {
        color: Colors.frontColor,
        backgroundColor: 'transparent'
    },
    eventCardSecondary: {
        borderWidth: 1,
        borderColor: Colors.frontColor,
        borderRadius: 40,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 10
    }
});


export default styles;
