import { StyleSheet } from 'react-native';
import { Colors } from '../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 1,
        backgroundColor: Colors.backgroundColor
    },
    titleSelected: {
        color: Colors.infraRed,
        marginTop: -2,
        marginBottom: 7,
        opacity: 1
    },
    titleStyle: {
        fontFamily: 'NotoSans-Bold',
        opacity: 0
    },
    tabNotSelected: {
        marginBottom: -8
    },
    tabBarStyle: {
        backgroundColor: Colors.frontColor
    }
});

export default styles;
