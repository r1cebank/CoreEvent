import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start'
    },
    header: {
        color: Colors.grey,
        fontSize: 20,
        fontWeight: '700'
    },
    info: {
        color: Colors.grey,
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: '300',
        paddingTop: 30
    }
});


export default styles;
