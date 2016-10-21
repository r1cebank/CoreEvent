import { StyleSheet } from 'react-native';
import { Colors } from '../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 1,
        backgroundColor: 'black'
    },
    titleSelected: {
        color: Colors.primary,
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
        backgroundColor: Colors.backgroundColor
    }
});

export default styles;
