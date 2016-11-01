import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    cardImage: {
        resizeMode: 'cover'
    },
    card: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        borderWidth: 0
    },
    cardContainer: {
        flex: 1,
        shadowRadius: 0,
        borderRadius: 20,
        borderWidth: 0,
        width: 250,
        marginRight: 10,
        margin: 0
        // backgroundColor: '#A8DADC'
        // borderColor: Colors.secondary
    },
    titleStyle: {
        minHeight: 17,
        maxHeight: 17,
        color: Colors.frontColor
        // fontWeight: 'bold'
    },
    statusButton: {
        padding: 5,
        borderWidth: 0.5,
        marginBottom: 10,
        borderColor: Colors.frontColor
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
        marginLeft: 10
    },
    dateVenueSecondaryText: {
        color: Colors.frontColor
    },
    dateVenueText: {
        fontWeight: 'bold',
        color: Colors.frontColor
    },
    blur: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});


export default styles;
