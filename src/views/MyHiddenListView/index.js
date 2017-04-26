import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import {
    API,
    Languages,
    Views,
    Storage,
    Components,
    Actions,
    Store
} from '../../global/globalIncludes';
import styles from './resources/styles';

class MyFavoriteListView extends Component {
    static propTypes = {
        hidden: React.PropTypes.array,
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
        RouterActions.refresh({ title: Languages.t('hiddenEvents', this.props.locale) });
        this.setState({ isRefreshing: true });
        await this.updateHidden(this.props.hidden);
        this.setState({ isRefreshing: false });
    }
    async componentWillReceiveProps(nextProps) {
        if (this.props.hidden !== nextProps.hidden) {
            await this.updateHidden(nextProps.hidden);
        }
    }
    updateHidden = async (hidden) => {
        const events = [];
        for (const eventId of hidden) {
            const event = await Storage.Event.fetchById(eventId);
            const response = await API.Cloud.run('countAttendance', {
                objectId: event.id
            });
            event.attendeeCount = response;
            events.push(event);
        }
        this.setState({ events });
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
                message={Languages.t('noEventsFound', this.props.locale)}
                onPress={() => {
                    Store.appStore.dispatch(Actions.Settings.selectTab('aroundme'));
                }}
                buttonText={Languages.t('browseEvents', this.props.locale)}
                />
        );
    }
    render() {
        if (this.state.isRefreshing) {
            return <Views.LoadingView loadingText={Languages.t('loading', this.props.locale)} />;
        }
        if (!this.state.events.length) {
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
                                        onDelete={() => {
                                            Store.appStore
                                            .dispatch(Actions.Data.removeHidden(event));
                                        }}
                                        attendees={event.attendeeCount}
                                        editMode={true}
                                        buttons={[ 'count', 'qr', 'delete' ]}
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

MyFavoriteListView.defaultProps = {
    favorites: []
};

function select(store) {
    return {
        locale: store.settings.locale,
        hidden: store.data.hidden,
        config: store.settings.config
    };
}

module.exports = connect(select)(MyFavoriteListView);
