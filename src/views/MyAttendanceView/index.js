import { connect } from 'react-redux';
import React, { Component } from 'react';
import DialogBox from 'react-native-dialogbox';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Store, Actions, Languages, Views, Storage, Components } from '../../global/globalIncludes';
import styles from './resources/styles';

class MyAttendanceView extends Component {
    static propTypes = {
        category: React.PropTypes.object,
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            attendances: [],
            loading: true,
            isRefreshing: false
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('attending', this.props.locale) });
        await this.loadAttendances();
    }
    loadAttendances = async () => {
        const attendances = await Storage.Attendance.fetchMine();
        for (const attendance of attendances) {
            attendance.event = await attendance.get('event').fetch();
            attendance.event.attendees = await Storage
                .Attendance.fetchAttendee(attendance.event.id);
        }
        this.setState({
            attendances,
            loading: false
        });
    }
    onRefresh = async () => {
        this.setState({ isRefreshing: true });
        await this.loadAttendances();
        this.setState({ isRefreshing: false });
    }
    renderEmpty = () => {
        return (
            <Components.EmptyList
                message={Languages.t('noAttendedEvents', this.props.locale)}
                onPress={() => {
                    Store.appStore.dispatch(Actions.Settings.selectTab('aroundme'));
                }}
                buttonText={Languages.t('browseEvents', this.props.locale)}
                />
        );
    }
    confirmQuit = (event) => {
        this.dialogbox.confirm({
            content: Languages.t('leaveConfirm', this.props.locale),
            ok: {
                text: Languages.t('confirm', this.props.locale),
                callback: async () => {
                    await Storage.Attendance.leave(event);
                    Store.appStore.dispatch(Actions.Settings.selectTab('aroundme'));
                }
            },
            cancel: {
                text: Languages.t('cancel', this.props.locale)
            }
        });
    }
    renderList = () => {
        if (this.state.attendances.length < 1) {
            return this.renderEmpty();
        }
        return this.state.attendances.map((attendance, index) => {
            return (
                <View
                    key={index}
                    style={styles.eventsContainer}>
                    <Components.EventTile
                        locale={this.props.locale}
                        eventTitle={attendance.event.get('name')}
                        openQR={() => RouterActions.qrViewer({
                            event: attendance.event
                        })}
                        attendees={attendance.event.attendees.length}
                        attending={true}
                        onPressAlt={() => {
                            this.confirmQuit(attendance.event);
                        }}
                        hideDescription={true}
                        venueName={attendance.event.get('location').name}
                        venueAddress={attendance.event.get('location').address}
                        description={attendance.event.get('description')}
                        ctaAltTitle={Languages.t('attending', this.props.locale)}
                        ctaTitle={Languages.t('addToMe', this.props.locale)}
                        startTime={attendance.event.get('start')} />
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

module.exports = connect(select)(MyAttendanceView);
