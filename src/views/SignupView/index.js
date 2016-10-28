/* global __DEV__ */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CheckBox } from 'react-native-elements';
import { Kohana } from 'react-native-textinput-effects';


import styles from './resources/styles';
import { Colors, Dimensions, Icons } from '../../global/globalIncludes';

class SignupView extends Component {
    static propTypes = {
        loadingText: React.PropTypes.string
    };
    onUsernameUpdate = () => {

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignSelf: 'stretch'}}>
                    <Text style={styles.header}>Register</Text>
                    <View style={{ marginBottom: 10}}>
                        <Kohana
                            style={{ backgroundColor: '#f9f5ed' }}
                            label="Username"
                            iconClass={Icons.MaterialIcons}
                            iconName={'account-circle'}
                            iconColor={'#f4d29a'}
                            labelStyle={{ color: '#91627b' }}
                            inputStyle={{ color: '#91627b' }} />
                        <Kohana
                            style={{ backgroundColor: '#f9f5ed' }}
                            label="Password"
                            secureTextEntry={true}
                            iconClass={Icons.MaterialIcons}
                            iconName={'lock'}
                            iconColor={'#f4d29a'}
                            labelStyle={{ color: '#91627b' }}
                            inputStyle={{ color: '#91627b' }} />
                        <Kohana
                            style={{ backgroundColor: '#f9f5ed' }}
                            label="Confirm"
                            secureTextEntry={true}
                            iconClass={Icons.MaterialIcons}
                            iconName={'lock'}
                            iconColor={'#f4d29a'}
                            labelStyle={{ color: '#91627b' }}
                            inputStyle={{ color: '#91627b' }} />
                    </View>
                    <CheckBox
                        containerStyle={{backgroundColor:'transparent', borderWidth:0}}
                        title='I agree to the terms and conditions' />
                    <Button
                        borderRadius={40}
                        textStyle={styles.button}
                        backgroundColor={Colors.green}
                        buttonStyle={{marginBottom: 10}}
                        title="Register" />
                    <Button
                        borderRadius={40}
                        textStyle={styles.button}
                        onPress={Actions.pop}
                        backgroundColor={Colors.grey}
                        title="Back" />
                </View>
            </View>
        );
    }
}

module.exports = SignupView;
