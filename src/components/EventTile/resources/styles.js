import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    eventCard: {
        alignSelf: 'stretch',
        flex: 1,
        borderRadius: 20,
        borderWidth: 0.5,
        margin: 0,
        shadowRadius: 0,
        marginBottom: 10,
        borderColor: Colors.secondary
    },
    imageStyle: {
        borderRadius: 20
    },
    eventCardCTA: {
        borderRadius: 40,
        marginLeft: 0,
        marginRight: 10,
        marginBottom: 0,
        marginTop: 10
    },
    etcIconStyle: {
        marginRight: 0
    },
    eventCardSecondary: {
        borderRadius: 40,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 10
    }
});


export default styles;
