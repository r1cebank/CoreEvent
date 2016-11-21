import React, { Component } from 'react';
import { Navigator, Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { Views } from '../../global/globalIncludes';
import styles from './resources/styles';

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

const scenes = Actions.create(
    <Scene
        key="messagesRoot">
        <Scene
            key="messages"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.MessagesView}
            initial={true} />
    </Scene>
);

class SettingScene extends Component {
    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}

module.exports = SettingScene;
