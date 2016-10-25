/*
* CoreEvent
* index is the entrypoint of the event app, which will register the Root Component
* with the AppRegistry, it is advised not to change this file since it is generated
*/

/* eslint-disable*/

import React from 'react-native';
import QuickActions from 'react-native-quick-actions';

import Root from './src/root';


// Add few actions
QuickActions.setShortcutItems([
    {
        type: "Event", // Required
        subtitle: "Create a event",
        icon: "Compose"
    },
    {
        type: "Scan", // Required
        title: "Scan a code", // Optional, if empty, `type` will be used instead
        icon: "scan"
    }
]);

__TEST__ = false;

const {
    AppRegistry
} = React;

AppRegistry.registerComponent('CoreEvent', Root);
