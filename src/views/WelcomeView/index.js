/* global __DEV__ */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import Video from 'react-native-video';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { Colors, Languages, Assets } from '../../global/globalIncludes';

import styles from './resources/styles';

class WelcomeView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content" />
                <Video
                    source={Assets.loginVideo}
                    rate={1.0}                     // 0 is paused, 1 is normal.
                    muted={true}                  // Mutes the audio entirely.
                    paused={false}                 // Pauses playback entirely.
                    resizeMode="cover"             // Fill the whole screen at aspect ratio.
                    repeat={false}                  // Repeat forever.
                    playWhenInactive={false}
                    style={styles.backgroundVideo} />
                <View style={styles.contentContainer}>
                    <View style={{ marginTop: 50 }}>
                        <Image style={styles.icon} source={Assets.icon} />
                        <Text style={styles.header}>相聚   改变   生活</Text>
                    </View>
                    <View>
                        <Button
                            borderRadius={40}
                            textStyle={styles.loginButton}
                            backgroundColor={Colors.infraRed}
                            onPress={Actions.loginView}
                            title={`${Languages.t('signup', this.props.locale)} / ${Languages.t('login', this.props.locale)}`} />
                    </View>
                </View>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(WelcomeView);
