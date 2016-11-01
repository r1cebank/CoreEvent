import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { Navigator, Platform } from 'react-native';
import { Scene, Router, Actions as RouterActions, Modal } from 'react-native-router-flux';

import { Views, Colors, Actions } from '../../global/globalIncludes';
import styles from './resources/styles';

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

const scenes = RouterActions.create(
    <Scene
        key="homeRoot">
        <Scene
            key="home"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.HomeView}
            renderLeftButton={() =>
                <Icon
                    color={Colors.grey}
                    name="swap-horiz" />
            }
            initial={true} />
        <Scene
            key="carousel"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.CarouselView} />
        <Scene
            key="qrScanner"
            direction="vertical"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.QRScannerView} />
    </Scene>
);

class HomeScene extends Component {
    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}

module.exports = HomeScene;
