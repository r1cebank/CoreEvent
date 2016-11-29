import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
        color: Colors.frontColor,
        backgroundColor: 'transparent',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },
    timeVenue: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    description: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        color: Colors.frontColor
    },
    eventCard: {
        flex: 1,
        borderRadius: 20,
        padding: 20
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
    attendingCTA: {
        borderWidth: 1,
        borderColor: Colors.frontColor,
        borderRadius: 40,
        marginLeft: 0,
        marginRight: 0,
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
    },
    eventCardEditButton: {
        borderWidth: 1,
        borderColor: Colors.frontColor,
        borderRadius: 20,
        marginLeft: 0,
        marginRight: 0,
        minWidth: 50,
        marginBottom: 0,
        marginTop: 10
    }
});


export default styles;
