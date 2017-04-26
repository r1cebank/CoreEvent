import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Views, Storage, Components, Store, Actions } from '../../global/globalIncludes';
import styles from './resources/styles';

class EventListView extends Component {
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
        RouterActions.refresh({ title: Languages.f(this.props.category.name, this.props.locale) });
        this.setState({ isRefreshing: true });
        const events = await Storage.Event.fetchByCategory(this.props.category.objectId);
        this.setState({ events, isRefreshing: false });
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 5000);
    }
    createNew = () => {
        Store.appStore.dispatch(Actions.Settings.selectTab('aroundme'));
        setTimeout(() => {
            RouterActions.newEvent();
        }, 100);
    }
    renderEmpty = () => {
        return (
            <Components.EmptyList
                message={Languages.t('noEventsFound', this.props.locale)}
                onPress={this.createNew}
                buttonText={Languages.t('createOne', this.props.locale)}
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
                    <View
                        style={styles.cardContainer}>
                            {(() => {
                                return this.state.events.map((event, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={styles.eventsContainer}>
                                            <Components.EventTile
                                                locale={this.props.locale}
                                                eventTitle={event.get('name')}
                                                onPressSecondary={() => {
                                                    this.eventAction(event);
                                                }}
                                                venueName={event.get('location').name}
                                                venueAddress={event.get('location').address}
                                                description={event.get('description')}
                                                ctaTitle={Languages.t('addToMe', this.props.locale)}
                                                startTime={event.get('start')} />
                                        </View>
                                    );
                                });
                            })()}
                    </View>
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

module.exports = connect(select)(EventListView);
