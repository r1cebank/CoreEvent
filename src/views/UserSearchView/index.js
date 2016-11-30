import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
import dismissKeyboard from 'react-native-dismiss-keyboard'
import { View, ScrollView, ListView } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Kohana } from 'react-native-textinput-effects';

import { Languages, Colors, Storage, API, Icons, Components } from '../../global/globalIncludes';

import styles from './resources/styles';

class UserSearchView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        event: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            notice: {},
            searchText: ''
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('inviteUser', this.props.locale) });
    }
    showNotice = (notice) => {
        this.setState({
            showNotice: true,
            notice
        });
        this.popupDialog.openDialog();
    }
    onChangeText = (searchText) => {
        this.setState({ searchText });
    }
    inviteUser = async () => {
        dismissKeyboard();
        const userData = await Storage.User.userExists(this.state.searchText);
        if (userData.length) {
            if (API.Parse.User.current().id !== userData[0].id) {
                // Adding the invitation component
                try {
                    await Storage.Invitation.invite(
                        userData[0],
                        this.props.event,
                        Languages.t('invitationMessage', this.props.locale)
                    );
                    this.showNotice({
                        icon: 'check',
                        color: Colors.green,
                        header: Languages.t('success', this.props.locale),
                        notice: Languages.t('userInvited', this.props.locale)
                    });
                } catch (e) {
                    if (e.code === 141) {
                        this.showNotice({
                            icon: 'error',
                            color: Colors.infraRed,
                            header: Languages.t('error', this.props.locale),
                            notice: Languages.t('userAlreadyInvited', this.props.locale)
                        });
                    } else {
                        this.showNotice({
                            icon: 'warning',
                            color: Colors.infraRed,
                            header: Languages.t('error', this.props.locale),
                            notice: Languages.t('inviteError', this.props.locale)
                        });
                    }
                }
            } else {
                this.showNotice({
                    icon: 'warning',
                    color: Colors.saffron,
                    header: Languages.t('warning', this.props.locale),
                    notice: Languages.t('userNotFound', this.props.locale)
                });
            }
        } else {
            this.showNotice({
                icon: 'warning',
                color: Colors.saffron,
                header: Languages.t('warning', this.props.locale),
                notice: Languages.t('userNotFound', this.props.locale)
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Kohana
                        style={styles.input}
                        autoCapitalize="none"
                        label={Languages.t('phoneNumber', this.props.locale)}
                        onChangeText={this.onChangeText}
                        iconClass={Icons.MaterialIcons}
                        iconName={'account-circle'}
                        iconColor={Colors.infraRed}
                        labelStyle={{ color: Colors.infraRed }}
                        inputStyle={{ color: Colors.infraRed }} />
                </View>
                <Button
                    onPress={this.inviteUser}
                    backgroundColor={Colors.infraRed}
                    buttonStyle={styles.button}
                    title={Languages.t('invite', this.props.locale)} />
                <PopupDialog
                    width={0.8}
                    height={200}
                    open={this.state.showNotice}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                    <Components.Notice
                        color={this.state.notice.color}
                        icon={this.state.notice.icon}
                        header={this.state.notice.header}
                        notice={this.state.notice.notice} />
                </PopupDialog>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(UserSearchView);
