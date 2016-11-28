import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ActionSheet from 'react-native-actionsheet';
import PopupDialog from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions as RouterActions } from 'react-native-router-flux';
import { List, ListItem, Icon } from 'react-native-elements';


import {
    Languages,
    Store,
    Actions,
    Colors,
    API,
    Assets,
    Storage,
    Components
} from '../../global/globalIncludes';

import styles from './resources/styles';

const CANCEL_INDEX = 0;

class ProfileView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        user: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            hosted: 0,
            attended: 0,
            notice: {},
            loading: false
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('profileLC', this.props.locale) });
        const events = await Storage.Event.fetchMyEvents();
        const attendedEvents = await Storage.Attendance.fetchMine();
        this.setState({
            hosted: events.length,
            attended: attendedEvents.length
        });
    }
    showNotice = (notice) => {
        this.setState({
            notice
        });
        this.popupDialog.openDialog();
    }
    onActionSelect = async (index) => {
        if (index > 0) {
            if (index === 1) {
                try {
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
                } catch (e) {
                    this.setState({
                        loading: false
                    });
                }
            } else {
                try {
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
                } catch (e) {
                    this.setState({
                        loading: false
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
                <LinearGradient
                    colors={[ Colors.saffron, Colors.infraRed ]}
                    style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        {(() => {
                            if (this.props.user.vip) {
                                return (
                                    <Icon
                                        reverse
                                        size={10}
                                        name="stars"
                                        iconStyle={{ fontSize: 15 }}
                                        containerStyle={{
                                            position: 'absolute',
                                            left: 60,
                                            top: 1,
                                            zIndex: 1
                                        }}
                                        color={Colors.infraRed}
                                    />
                                );
                            }
                            return null;
                        })()}
                        <TouchableOpacity
                            onPress={() => this.ActionSheet.show()}>
                            {(() => {
                                if (API.Parse.User.current().get('avatar')) {
                                    return (
                                        <Image
                                            style={styles.avatarImage}
                                            indicatorProps={{ color: Colors.infraRed }}
                                            source={{
                                                uri: API.Parse.User.current().get('avatar').url()
                                            }}
                                            indicator={Progress.Circle} />
                                    );
                                }
                                return (
                                    <Image
                                        style={styles.avatarImage}
                                        indicatorProps={{ color: Colors.infraRed }}
                                        source={Assets.profile}
                                        indicator={Progress.Circle} />
                                );
                            })()}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nameStatContainer}>
                        <Text style={styles.usernameText}>
                            {API.Parse.User.current().get('username').toUpperCase()}
                        </Text>
                        <View style={styles.statContainer}>
                            <Text style={styles.statText}>
                                {this.state.attended} {Languages.t('attended', this.props.locale)}
                            </Text>
                            <Text style={styles.statText}>
                                {this.state.hosted} {Languages.t('hosted', this.props.locale)}
                            </Text>
                            <Text style={styles.statText}>
                                1 {Languages.t('experience', this.props.locale)}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
                <List containerStyle={styles.listContainer}>
                    <ListItem
                        hideChevron={true}
                        wrapperStyle={{ padding: 5 }}
                        title={Languages.t('attending', this.props.locale)}
                        titleStyle={styles.titleStyle}
                        leftIcon={{ name: 'directions-walk', style: styles.iconStyle }}
                    />
                    <ListItem
                        hideChevron={true}
                        wrapperStyle={{ padding: 5 }}
                        onPress={RouterActions.myEvents}
                        title={Languages.t('myEvents', this.props.locale)}
                        titleStyle={styles.titleStyle}
                        leftIcon={{ name: 'event', style: styles.iconStyle }}
                    />
                    <ListItem
                        hideChevron={true}
                        wrapperStyle={{ padding: 5 }}
                        title={Languages.t('myFavorite', this.props.locale)}
                        titleStyle={styles.titleStyle}
                        leftIcon={{ name: 'favorite', style: styles.iconStyle }}
                    />
                </List>
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

ProfileView.defaultProps = {
    user: {}
};

function select(store) {
    return {
        locale: store.settings.locale,
        user: store.settings.user
    };
}

module.exports = connect(select)(ProfileView);
