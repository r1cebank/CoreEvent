import { StyleSheet } from 'react-native';

import { Dimensions, Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    container: {
        width: Dimensions.popupWidth,
        height: Dimensions.popupHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    }
});

export const sizes = {
    icon: Dimensions.popupIconSize
};

export default styles;
