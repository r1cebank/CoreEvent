import { connect } from 'react-redux';
import React, { Component } from 'react';
import PopupDialog from 'react-native-popup-dialog';
import DialogBox from 'react-native-dialogbox';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import {
    API,
    Languages,
    Views,
    Store,
    Actions,
    Storage,
    Colors,
    Components
} from '../../global/globalIncludes';
import styles from './resources/styles';

class MyEventListView extends Component {
    static propTypes = {
        category: React.PropTypes.object,
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            showNotice: false,
            notice: {},
            loading: true,
            isRefreshing: false
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('myEvents', this.props.locale) });
        await this.fetchMyEvents();
        this.setState({
            loading: false
        });
    }
    fetchMyEvents = async () => {
        const events = await Storage.Event.fetchMyEvents();
        for (const event of events) {
            const response = await API.Cloud.run('countAttendance', {
                objectId: event.id
            });
            event.attendeeCount = response;
        }
        this.setState({
            events
        });
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 5000);
    }
    renderEmpty = () => {
        return (
            <Components.EmptyList
                message={Languages.t('noCreatedEvents', this.props.locale)}
                onPress={() => {
                    Store.appStore.dispatch(Actions.Settings.selectTab('aroundme'));
                    setTimeout(() => { RouterActions.newEvent(); }, 0);
                }}
                buttonText={Languages.t('newEvent', this.props.locale)}
                />
        );
    }
    showNotice = (notice) => {
        this.setState({
            notice
        });
        this.popupDialog.openDialog();
    }
    deleteEvent = (event) => {
        this.dialogbox.confirm({
            content: Languages.t('deleteEventConfirm', this.props.locale),
            ok: {
                text: Languages.t('confirm', this.props.locale),
                callback: async () => {
                    // Delete event
                    try {
                        await Storage.Event.delete(event);
                        this.showNotice({
                            icon: 'check',
                            color: Colors.green,
                            header: Languages.t('success', this.props.locale),
                            notice: Languages.t('eventDeleted', this.props.locale)
                        });
                        // TODO: change to update instead of pop later
                        setTimeout(() => { RouterActions.pop(); }, 2000);
                    } catch (e) {
                        this.showNotice({
                            icon: 'error',
                            color: Colors.infraRed,
                            header: Languages.t('error', this.props.locale),
                            notice: Languages.t('eventDeleteFailed', this.props.locale)
                        });
                    }
                }
            },
            cancel: {
                text: Languages.t('cancel', this.props.locale)
            }
        });
    }
    renderList = () => {
        if (this.state.events.length < 1) {
            return this.renderEmpty();
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
                        onDelete={() => this.deleteEvent(event)}
                        attendees={event.attendeeCount}
                        editMode={true}
                        buttons={[ 'count', 'qr', 'edit', 'delete' ]}
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
        if (this.state.loading) {
            return <Views.LoadingView loadingText="Loading" />;
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
                <DialogBox ref={(dialogbox) => this.dialogbox = dialogbox} />
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(MyEventListView);
