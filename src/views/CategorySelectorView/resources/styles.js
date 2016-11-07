import { StyleSheet } from 'react-native';

import { Colors, Dimensions } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    },
    scrollView: {
        flex: 1,
        alignSelf: 'stretch'
    },
    list: {
        flex: 1,
        marginTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        margin: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 15,
        paddingRight: 15,
        padding: 5
    }
});


export default styles;
