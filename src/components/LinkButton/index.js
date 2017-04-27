import React from 'react';
import {
    Linking,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { Analytics, Tags, Actions, Store } from '../../global/globalIncludes';

class LinkButton extends React.Component {
    static propTypes = {
        url: React.PropTypes.string,
        text: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        buttonStyle: View.propTypes.style
    };

    handleClick = () => {
        Analytics.GAAction(Tags.Category.LINK, this.props.url);
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                Store.appStore.dispatch(Actions.Utils.appError(
                    new Error('Cannot open url'),
                    'CRITICAL',
                    this.props.url));
            }
        });
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.handleClick}>
                <View style={this.props.buttonStyle}>
                    <Text style={this.props.textStyle}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

module.exports = LinkButton;
