import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.grey
    },
    timeVenue: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    timeVenueSecondaryText: {
        color: Colors.grey,
        backgroundColor: 'transparent'
    },
    timeVenueText: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        color: Colors.grey
    }
});


export default styles;
