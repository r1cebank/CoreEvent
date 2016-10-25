import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    cardImage: {
        resizeMode: 'cover'
    },
    cardContainer: {
        flex: 1,
        shadowRadius: 0,
        borderWidth: 0.5,
        maxWidth: 200,
        marginRight: 10,
        margin: 0
    },
    statusButton: {
        padding: 5,
        marginBottom: 10
    },
    statusText: {
        fontSize: 13
    },
    statusIconStyle: {
        fontSize: 13
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    dateTimeContainer: {
        marginLeft: 5
    },
    dateVenueText: {
        fontWeight: 'bold'
    }
});


export default styles;
