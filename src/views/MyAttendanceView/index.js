import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Views, Storage, Components } from '../../global/globalIncludes';
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
            isRefreshing: false
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('myEvents', this.props.locale) });
        const attendances = await Storage.Attendance.fetchMine();
        for (const attendance of attendances) {
            attendance.event = await attendance.get('event').fetch();
            attendance.event.attendees = await Storage
                .Attendance.fetchAttendee(attendance.event.id);
        }
        this.setState({ attendances });
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 5000);
    }
    render() {
        if (!this.state.attendances.length) {
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
                    {(() => {
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
                    })()}
                </ScrollView>
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
