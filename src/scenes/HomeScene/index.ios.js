import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { Navigator, Platform } from 'react-native';
import { Scene, Router, Actions, Modal } from 'react-native-router-flux';

import { Views, Colors } from '../../global/globalIncludes';
import styles from './resources/styles';

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;

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
            renderRightButton={() =>
                <Icon
                    color={Colors.infraRed}
                    onPress={Actions.qrScanner}
                    name="search" />
            }
            renderLeftButton={() =>
                <Icon
                    color={Colors.infraRed}
                    onPress={Actions.newEvent}
                    name="add" />
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
            renderBackButton={() => null}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.QRScannerView} />
        <Scene
            key="newEvent"
            direction="vertical"
            panHandlers={null}
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            renderBackButton={() =>
                <Icon
                    color={Colors.infraRed}
                    onPress={Actions.pop}
                    name="clear" />
            }
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.NewEventView} />
        <Scene
            key="locationSelector"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.LocationSelectorView} />
        <Scene
            key="childLocationSelector"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.ChildLocationSelectorView} />
        <Scene
            key="categorySelector"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.CategorySelectorView} />
        <Scene
            key="addressSearcher"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            titleStyle={styles.titleStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.AddressSelectorView} />
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
