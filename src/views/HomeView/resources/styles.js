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
    }
});


export default styles;
