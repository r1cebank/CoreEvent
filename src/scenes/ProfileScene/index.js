import React, { Component } from 'react';
import { Navigator, Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { Views } from '../../global/globalIncludes';
import styles from './resources/styles';

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

const scenes = Actions.create(
    <Scene
        key="profileRoot">
        <Scene
            key="profile"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.ProfileView}
            initial={true} />
        <Scene
            key="draftList"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            titleStyle={styles.titleStyle}
            rightButtonTextStyle={styles.rightButtonTextStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.DraftView} />
    </Scene>
);

class ProfileScene extends Component {
    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}

module.exports = ProfileScene;
