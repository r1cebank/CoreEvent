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
    carousel: {
        height: 100
    },
    carouselImage: {
        resizeMode: 'cover',
        height: 100
    },
    buttonDrawer: {
        backgroundColor: Colors.frontColor,
        maxHeight: 70
    },
    buttonDrawerContainer: {
        justifyContent: 'center'
    },
    yourEvent: {
        backgroundColor: Colors.frontColor
    },
    yourEventContainer: {
        justifyContent: 'center'
    },
    cardTitle: {
        textAlign: 'left'
    },
    cardContainer: {
        backgroundColor: Colors.frontColor,
        marginTop: 10,
        margin: 0,
        shadowRadius: 0
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
    clouds: {
        height: 20,
        width: 100,
        resizeMode: 'contain'
    },
    recommendedContainer: {
        flexDirection: 'column'
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
    }
});


export default styles;
