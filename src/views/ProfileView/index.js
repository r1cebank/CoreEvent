import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button, List, ListItem, Icon } from 'react-native-elements';
import DialogBox from 'react-native-dialogbox';

import { Languages, Store, Actions, Colors, API } from '../../global/globalIncludes';

import styles from './resources/styles';

const list = [
    {
        title: 'Appointments',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    }
];

class ProfileView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('profileLC', this.props.locale) });
    }
    logout = () => {
        this.dialogbox.confirm({
            content: Languages.t('logoutConfirm', this.props.locale),
            ok: {
                callback: () => {
                    Store.appStore.dispatch(Actions.Settings
                        .logoutUser());
                }
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, height: 100, width: 100}}>
                        <Icon
                            reverse
                            size={10}
                            name="mode-edit"
                            containerStyle={{position: 'absolute', left: 0, zIndex: 1}}
                            color={Colors.grey}
                        />
                        <Image
                            style={{flexDirection: 'row', height: 80, width: 80, resizeMode: 'cover', borderRadius: 40, justifyContent:'center', alignItems:'center'}}
                            source={{uri: API.Parse.User.current().get('avatar').url()}} />
                    </View>
                </View>
                <List containerStyle={{ marginBottom: 20, borderColor: Colors.grey, marginTop: 0, marginBottom: 0, borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
                    <ListItem
                        wrapperStyle={{ padding: 5 }}
                        title={Languages.t('myEvents', this.props.locale)}
                        titleStyle={{ color: Colors.grey, fontSize: 20, paddingLeft: 10 }}
                        leftIcon={{ name: 'event', style: { color: Colors.grey, fontSize: 30 } }}
                    />
                    <ListItem
                        wrapperStyle={{ padding: 5 }}
                        title={Languages.t('myFavorite', this.props.locale)}
                        titleStyle={{ color: Colors.grey, fontSize: 20, paddingLeft: 10 }}
                        leftIcon={{ name: 'favorite', style: { color: Colors.grey, fontSize: 30 } }}
                    />
                </List>
                <Button
                    onPress={this.logout}
                    backgroundColor={Colors.infraRed}
                    buttonStyle={{ borderRadius: 40, marginTop: 20 }}
                    title={Languages.t('logout', this.props.locale)} />
                <DialogBox ref={(dialogbox) => this.dialogbox = dialogbox} />
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(ProfileView);
