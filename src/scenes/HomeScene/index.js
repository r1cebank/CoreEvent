import React, { Component } from 'react';
import { Navigator, Platform, StatusBar } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import { Views } from '../../global/globalIncludes';

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class HomeScene extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="home"
                        sceneStyle={{
                            paddingTop: Navigator
                            .NavigationBar.Styles.General.NavBarHeight + statusBarHeight
                        }}
                        component={Views.HomeView}
                        title="home"
                        initial={true} />
                </Scene>
            </Router>
        );
    }
}

module.exports = HomeScene;
