import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Languages, Views, Storage, Components } from '../../global/globalIncludes';
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
        Actions.refresh({ title: Languages.f(this.props.category.name, this.props.locale) });
        const events = await Storage.Event.fetchByCategory(this.props.category.objectId);
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
