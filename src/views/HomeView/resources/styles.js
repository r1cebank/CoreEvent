import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    yourEvent: {
        paddingLeft: 15,
        backgroundColor: 'transparent'
    },
    cardTitle: {
        textAlign: 'left'
    },
    cardContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginTop: 10,
        margin: 0,
        shadowRadius: 0,
        shadowColor: 'transparent'
    },
    myCardContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginTop: 10,
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0,
        shadowRadius: 0,
        shadowColor: 'transparent'
    },
    header: {
        padding: 20,
        fontSize: 15,
        fontWeight: '700',
        color: Colors.infraRed
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 100 / 2,
        backgroundColor: 'white',
        opacity: 0.7
    },
    circle2: {
        width: 45,
        height: 25,
        left: 175,
        borderRadius: 50,
        backgroundColor: 'black',
        transform: [
            { scaleX: 2 }
        ]
    },
    recommendedContainer: {
        paddingLeft: 15,
        paddingRight: 15
    },
    nearbyTile: {
        marginBottom: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clouds: {
        height: 20,
        width: 100,
        resizeMode: 'contain'
    },
    eventCard: {
        flex: 1,
        margin: 0,
        shadowRadius: 0,
        marginBottom: 10
    },
    eventCardButton: {
        borderRadius: 40,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    },
    eventModal: {
        alignSelf: 'stretch',
        padding: 10,
        height: 300
    }
});


export default styles;
