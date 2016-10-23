import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { Navigator, Platform, StatusBar } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { Views, Colors } from '../../global/globalIncludes';
import styles from './resources/styles';

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const scenes = Actions.create(
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
            title="What's hot"
            renderRightButton={() =>
                <Icon
                    color={Colors.grey}
                    onPress={Actions.qrScanner}
                    name="crop-free" />
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
            title="QR Scanner"
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
