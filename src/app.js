import { View, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { Components } from './global/globalIncludes';

class App extends Component {
    static propTypes = {
        style: View.propTypes.style,
        location: React.PropTypes.object,
        customer: React.PropTypes.object,
        locale: React.PropTypes.string,
        inDebug: React.PropTypes.bool,
        hydrationComplete: React.PropTypes.bool
    };
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            try {
                // Handle Android back
            } catch (err) {
                // Handle app exit
            }
        });
    }
    componentWillUnMount() {
        // Remove backandroid handler
    }
    render() {
        return (
            // TODO: More complex scene config
            <View style={this.props.style}>
                {(() => {
                    if (this.props.inDebug) {
                        return (
                            <Components.DebugHeader />
                        );
                    }
                    return null;
                })()}
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale,
        inDebug: store.settings.inDebug
    };
}

module.exports = connect(select)(App);
