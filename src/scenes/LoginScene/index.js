import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { Views } from '../../global/globalIncludes';
import styles from './resources/styles';


const scenes = Actions.create(
    <Scene
        hideNavBar={true}
        key="loginRoot">
        <Scene
            key="welcome"
            component={Views.WelcomeView}
            initial={true} />
        <Scene
            key="loginView"
            component={Views.SignupView} />
        <Scene
            key="signupView"
            component={Views.SignupView} />
    </Scene>
);

class LoginScene extends Component {
    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}

module.exports = LoginScene;
