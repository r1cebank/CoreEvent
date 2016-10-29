/* global __DEV__ */

import Video from 'react-native-video';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import PopupDialog, { ScaleAnimation } from 'react-native-popup-dialog';
import { Button, CheckBox } from 'react-native-elements';
import { Kohana } from 'react-native-textinput-effects';


import styles from './resources/styles';
import { Colors, Dimensions, Icons } from '../../global/globalIncludes';

class SignupView extends Component {
    static propTypes = {
        loadingText: React.PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            showError: true,
            privacyChecked: false,
            termsChecked: false
        };
    }
    onUsernameUpdate = () => {

    }
    togglePrivacy = () => {
        this.setState({
            privacyChecked: !this.state.privacyChecked
        });
    }
    toggleTerms = () => {
        this.setState({
            termsChecked: !this.state.termsChecked
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Video
                    source={{ uri: 'login' }}
                    rate={1.0}
                    muted={true}
                    paused={false}
                    resizeMode="cover"
                    repeat={true}
                    playWhenInactive={false}
                    style={styles.video} />
                <View style={{ alignSelf: 'stretch' }}>
                    <Text style={styles.header}>Register</Text>
                    <View style={{ marginBottom: 10 }}>
                        <Kohana
                            style={{ backgroundColor: Colors.secondary }}
                            label="Username"
                            iconClass={Icons.MaterialIcons}
                            iconName={'account-circle'}
                            iconColor={Colors.green}
                            labelStyle={{ color: Colors.japaneseIndigo }}
                            inputStyle={{ color: Colors.japaneseIndigo }} />
                        <Kohana
                            style={{ backgroundColor: Colors.secondary }}
                            label="Password"
                            secureTextEntry={true}
                            iconClass={Icons.MaterialIcons}
                            iconName={'lock'}
                            iconColor={Colors.green}
                            labelStyle={{ color: Colors.japaneseIndigo }}
                            inputStyle={{ color: Colors.japaneseIndigo }} />
                        <Kohana
                            style={{ backgroundColor: Colors.secondary }}
                            label="Confirm"
                            secureTextEntry={true}
                            iconClass={Icons.MaterialIcons}
                            iconName={'lock'}
                            iconColor={Colors.green}
                            labelStyle={{ color: Colors.japaneseIndigo }}
                            inputStyle={{ color: Colors.japaneseIndigo }} />
                    </View>
                    <CheckBox
                        checkedColor={Colors.green}
                        uncheckedColor={Colors.grey}
                        checked={this.state.privacyChecked}
                        onPress={this.togglePrivacy}
                        textStyle={styles.checkboxText}
                        containerStyle={styles.checkBoxStyle}
                        title="I have read and agree to the privacy policy" />
                    <CheckBox
                        checkedColor={Colors.green}
                        uncheckedColor={Colors.grey}
                        checked={this.state.termsChecked}
                        onPress={this.toggleTerms}
                        textStyle={styles.checkboxText}
                        containerStyle={styles.checkBoxStyle}
                        title="I have read and agree to the terms and conditions" />
                    <Button
                        borderRadius={40}
                        disabled={false}
                        onPress={() => {
                            this.popupDialog.openDialog();
                        }}
                        textStyle={styles.button}
                        backgroundColor={Colors.green}
                        buttonStyle={{ marginBottom: 10 }}
                        title="Register" />
                    <Button
                        borderRadius={40}
                        textStyle={styles.button}
                        onPress={Actions.pop}
                        backgroundColor={Colors.grey}
                        title="Back" />
                </View>
                <PopupDialog
                    width={0.8}
                    height={200}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={new ScaleAnimation()}>
                    <View style={{alignItems:'center', flex:1, justifyContent:'flex-start'}}>
                        <Icon
                            reverse
                            name="error"
                            color={Colors.infraRed} />
                        <Text style={{color: Colors.grey, fontSize: 20, fontWeight: '700'}}>
                            Error occurred!
                        </Text>
                        <Text style={{color: Colors.grey, fontSize: 15, fontWeight: '300', paddingTop: 30}}>
                            Username is already registered
                        </Text>
                    </View>
                </PopupDialog>
            </View>
        );
    }
}

module.exports = SignupView;
