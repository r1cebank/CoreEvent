import { connect } from 'react-redux';
import React, { Component } from 'react';
import PopupDialog from 'react-native-popup-dialog';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import {
    API,
    Languages,
    Views,
    Storage,
    Components,
    Actions,
    Store,
    Colors
} from '../../global/globalIncludes';
import styles from './resources/styles';

class MyFavoriteListView extends Component {
    static propTypes = {
        favorites: React.PropTypes.array,
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            notice: {},
            loading: true,
            showNotice: false,
            isRefreshing: false
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('myFavorite', this.props.locale) });
        await this.updateFavorites(this.props.favorites);
    }
    async componentWillReceiveProps(nextProps) {
        if (this.props.favorites !== nextProps.favorites) {
            await this.updateFavorites(nextProps.favorites);
        }
    }
    updateFavorites = async (favorites) => {
        const events = [];
        for (const eventId of favorites) {
            const event = await Storage.Event.fetchById(eventId);
            const response = await API.Cloud.run('countAttendance', {
                objectId: event.id
            });
            event.attendeeCount = response;
            events.push(event);
        }
        this.setState({
            events,
            loading: false
        });
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 5000);
    }
    showNotice = (notice) => {
        this.setState({
            notice
        });
        this.popupDialog.openDialog();
    }
    attend = async (event) => {
        try {
            await Storage.Attendance.attend(event, Languages.t('attendanceMessage',
                this.props.locale));
            this.showNotice({
                icon: 'check',
                color: Colors.green,
                header: Languages.t('success', this.props.locale),
                notice: Languages.t('eventAttended', this.props.locale)
            });
            setTimeout(() => { this.removeFavorite(event); }, 2000);
        } catch (e) {
            this.showNotice({
                icon: 'error',
                color: Colors.infraRed,
                header: Languages.t('error', this.props.locale),
                notice: Languages.t('eventAttendFailed', this.props.locale)
            });
        }
    }
    removeFavorite = (event) => {
        Store.appStore.dispatch(Actions.Data.removeFavorite(event));
    }
    renderEmpty = () => {
        return (
            <Components.EmptyList
                message={Languages.t('noFavoriteEvents', this.props.locale)}
                onPress={() => {
                    Store.appStore.dispatch(Actions.Settings.selectTab('aroundme'));
                }}
                buttonText={Languages.t('browseEvents', this.props.locale)}
                />
        );
    }
    renderList = () => {
        if (this.state.loading) {
            return <Views.LoadingView loadingText={Languages.t('loading', this.props.locale)} />;
        }
        return this.state.events.map((event, index) => {
            return (
                <View
                    key={index}
                    style={styles.eventsContainer}>
                    <Components.EventTile
                        locale={this.props.locale}
                        eventTitle={event.get('name')}
                        openQR={() => RouterActions.qrViewer({
                            event
                        })}
                        openUserSearch={() => RouterActions.userSearch({
                            event
                        })}
                        onDelete={() => this.removeFavorite(event)}
                        onPress={() => this.attend(event)}
                        attendees={event.attendeeCount}
                        editMode={true}
                        buttons={[ 'qr', 'delete', 'add' ]}
                        hideDescription={true}
                        venueName={event.get('location').name}
                        venueAddress={event.get('location').address}
                        description={event.get('description')}
                        ctaTitle={Languages.t('addToMe', this.props.locale)}
                        startTime={event.get('start')} />
                </View>
            );
        });
    }
    render() {
        if (this.state.events.length < 1) {
            return this.renderEmpty();
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                      />
                    }>
                    {this.renderList()}
                </ScrollView>
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

MyFavoriteListView.defaultProps = {
    favorites: []
};

function select(store) {
    return {
        locale: store.settings.locale,
        favorites: store.data.favorites,
        config: store.settings.config
    };
}

module.exports = connect(select)(MyFavoriteListView);
