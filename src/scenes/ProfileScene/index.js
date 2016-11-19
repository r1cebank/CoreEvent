import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { Navigator, Platform } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { Views, Colors } from '../../global/globalIncludes';
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
        <Scene
            key="myEvents"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            titleStyle={styles.titleStyle}
            rightButtonTextStyle={styles.rightButtonTextStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.MyEventListView} />
        <Scene
            key="qrViewer"
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
            direction="vertical"
            leftButtonIconStyle={styles.leftButtonIconStyle}
            titleStyle={styles.titleStyle}
            rightButtonTextStyle={styles.rightButtonTextStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.QRViewer} />
        <Scene
            key="userSearch"
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
            direction="vertical"
            leftButtonIconStyle={styles.leftButtonIconStyle}
            titleStyle={styles.titleStyle}
            rightButtonTextStyle={styles.rightButtonTextStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.UserSearchView} />
        <Scene
            key="eventEdit"
            sceneStyle={{
                paddingTop: Navigator
                .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
            }}
            direction="vertical"
            leftButtonIconStyle={styles.leftButtonIconStyle}
            titleStyle={styles.titleStyle}
            rightButtonTextStyle={styles.rightButtonTextStyle}
            navigationBarStyle={styles.navbarStyle}
            component={Views.EventEditView} />
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
