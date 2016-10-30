import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import DialogBox from 'react-native-dialogbox';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ActionSheet from 'react-native-actionsheet';
import PopupDialog from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button, List, ListItem, Icon } from 'react-native-elements';


import {
    Languages,
    Store,
    Actions,
    Colors,
    API,
    Storage,
    Components
} from '../../global/globalIncludes';

import styles from './resources/styles';

const CANCEL_INDEX = 0;

class ProfileView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            notice: {},
            loading: false
        };
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('profileLC', this.props.locale) });
    }
    showNotice = (notice) => {
        this.setState({
            notice
        });
        this.popupDialog.openDialog();
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
    onActionSelect = async (index) => {
        if (index > 0) {
            if (index === 1) {
                const image = await ImagePicker.openCamera({
                    width: 200,
                    height: 200,
                    cropping: true,
                    includeBase64: true
                });
                this.setState({
                    loading: true
                });
                try {
                    await Storage.User.updateAvatar(image);
                    Store.appStore.dispatch(Actions.Settings
                        .fetchUserUpdate());
                    this.setState({
                        loading: false
                    });
                } catch (e) {
                    this.setState({
                        loading: false
                    });
                    this.showNotice({
                        icon: 'error',
                        color: Colors.infraRed,
                        header: Languages.t('error', this.props.locale),
                        notice: Languages.t('avatarUploadError', this.props.locale)
                    });
                }
            } else {
                this.setState({
                    loading: true
                });
                const image = await ImagePicker.openPicker({
                    width: 200,
                    height: 200,
                    cropping: true,
                    includeBase64: true
                });
                try {
                    await Storage.User.updateAvatar(image);
                    Store.appStore.dispatch(Actions.Settings
                        .fetchUserUpdate());
                    this.setState({
                        loading: false
                    });
                } catch (e) {
                    this.setState({
                        loading: false
                    });
                    this.showNotice({
                        icon: 'error',
                        color: Colors.infraRed,
                        header: Languages.t('error', this.props.locale),
                        notice: Languages.t('avatarUploadError', this.props.locale)
                    });
                }
            }
        }
    }
    render() {
        const buttons = [
            'cancel',
            Languages.t('takePhoto', this.props.locale),
            Languages.t('chooseFromLibrary', this.props.locale)
        ];
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.loading} />
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10, height: 100, width: 100}}>
                        <Icon
                            reverse
                            size={10}
                            name="mode-edit"
                            containerStyle={{position: 'absolute', left: 0, zIndex: 1}}
                            onPress={() => this.ActionSheet.show()}
                            color={Colors.grey}
                        />
                        <Image
                            style={{flexDirection: 'row', height: 80, width: 80, resizeMode: 'cover', borderRadius: 40, justifyContent:'center', alignItems:'center'}}
                            source={{uri: API.Parse.User.current().get('avatar').url()}}
                            indicator={Progress.Circle} />
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
                <ActionSheet
                    ref={(o) => this.ActionSheet = o}
                    title={Languages.t('selectAvatar', this.props.locale)}
                    options={buttons}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={this.onActionSelect}
                />
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

module.exports = connect(select)(ProfileView);
