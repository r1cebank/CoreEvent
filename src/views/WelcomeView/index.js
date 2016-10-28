/* global __DEV__ */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import Video from 'react-native-video';
import { Button } from 'react-native-elements';

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
                    source={{ uri: 'login' }}
                    rate={1.0}                     // 0 is paused, 1 is normal.
                    muted={true}                  // Mutes the audio entirely.
                    paused={false}                 // Pauses playback entirely.
                    resizeMode="cover"             // Fill the whole screen at aspect ratio.
                    repeat={true}                  // Repeat forever.
                    playWhenInactive={false}
                    style={styles.backgroundVideo} />
                <View style={styles.contentContainer}>
                    <Image style={{resizeMode:'cover', width: 150, height: 150, alignSelf:'center', marginBottom: 30}} source={Assets.icon} />
                    <Text style={styles.header}>Let meet</Text>
                    <Button
                        borderRadius={40}
                        textStyle={styles.signupButton}
                        backgroundColor={Colors.frontColor}
                        title={Languages.t('signup', this.props.locale)} />
                    <Button
                        borderRadius={40}
                        textStyle={styles.loginButton}
                        backgroundColor="transparent"
                        title={Languages.t('login', this.props.locale)} />
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
