import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Views, Storage, Components } from '../../global/globalIncludes';
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
            isRefreshing: false
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('myEvents', this.props.locale) });
        const events = await Storage.Event.fetchMyEvents();
        for (const event of events) {
            event.attendees = await Storage.Attendance.fetchAttendee(event.id);
        }
        this.setState({ events });
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 5000);
    }
    render() {
        if (!this.state.events.length) {
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
                                        attendees={event.attendees.length}
                                        editMode={true}
                                        hideDescription={true}
                                        venueName={event.get('location').name}
                                        venueAddress={event.get('location').address}
                                        description={event.get('description')}
                                        ctaTitle={Languages.t('addToMe', this.props.locale)}
                                        startTime={event.get('start')} />
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

module.exports = connect(select)(MyEventListView);
