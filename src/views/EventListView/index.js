import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
import ActionSheet from 'react-native-actionsheet';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Views, Colors, Storage, Components, Store, Actions } from '../../global/globalIncludes';
import styles from './resources/styles';

class EventListView extends Component {
    static propTypes = {
        category: React.PropTypes.object,
        favorites: React.PropTypes.array,
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            notice: {},
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
    openEventMisc = (event) => {
        this.selectedEvent = event;
        const match = this.props.favorites.filter((favorite) => {
            return (favorite === event.id);
        });
        if (match.length) {
            this.eventFavMiscActionSheet.show();
        } else {
            this.eventMiscActionSheet.show();
        }

    }
    eventMiscAction = (index) => {
        if (index === 1) {
            Store.appStore.dispatch(Actions.Data.addFavorite(this.selectedEvent));
        } else if (index === 2) {
            Store.appStore.dispatch(Actions.Data.hideEvent(this.selectedEvent));
        } else if (index === 3) {
            this.report(this.selectedEvent);
        }
    }
    eventFavMiscAction = (index) => {
        if (index === 1) {
            Store.appStore.dispatch(Actions.Data.removeFavorite(this.selectedEvent));
        } else if (index === 2) {
            Store.appStore.dispatch(Actions.Data.hideEvent(this.selectedEvent));
        } else if (index === 3) {
            this.report(this.selectedEvent);
        }
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
        } catch (e) {
            this.showNotice({
                icon: 'error',
                color: Colors.infraRed,
                header: Languages.t('error', this.props.locale),
                notice: Languages.t('eventAttendFailed', this.props.locale)
            });
        }
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
    showNotice = (notice) => {
        this.setState({
            notice
        });
        this.popupDialog.openDialog();
    }
    report = async (event) => {
        try {
            await Storage.Report.create(event);
            this.showNotice({
                icon: 'check',
                color: Colors.green,
                header: Languages.t('success', this.props.locale),
                notice: Languages.t('eventReported', this.props.locale)
            });
            Store.appStore.dispatch(Actions.Data.hideEvent(event));
        } catch (e) {
            this.showNotice({
                icon: 'error',
                color: Colors.infraRed,
                header: Languages.t('error', this.props.locale),
                notice: Languages.t(e.message, this.props.locale)
            });
        }
    }
    render() {
        const ActionSheetOptions = {
            eventMisc: {
                options: [
                    Languages.t('cancel', this.props.locale),
                    Languages.t('favorite', this.props.locale),
                    Languages.t('report', this.props.locale)
                ],
                CANCEL_INDEX: 0,
                DESTRUCTIVE_INDEX: 2
            },
            eventMiscFav: {
                options: [
                    Languages.t('cancel', this.props.locale),
                    Languages.t('removeFav', this.props.locale),
                    Languages.t('report', this.props.locale)
                ],
                CANCEL_INDEX: 0,
                DESTRUCTIVE_INDEX: 2
            }
        };
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
                                                onPress={() => this.attend(event)}
                                                onPressSecondary={() => {
                                                    this.openEventMisc(event);
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
                <ActionSheet
                    ref={(o) => this.eventMiscActionSheet = o}
                    options={ActionSheetOptions.eventMisc.options}
                    cancelButtonIndex={ActionSheetOptions.eventMisc.CANCEL_INDEX}
                    destructiveButtonIndex={ActionSheetOptions.eventMisc.DESTRUCTIVE_INDEX}
                    onPress={this.eventMiscAction}
                />
                <ActionSheet
                    ref={(o) => this.eventFavMiscActionSheet = o}
                    options={ActionSheetOptions.eventMiscFav.options}
                    cancelButtonIndex={ActionSheetOptions.eventMiscFav.CANCEL_INDEX}
                    destructiveButtonIndex={ActionSheetOptions.eventMiscFav.DESTRUCTIVE_INDEX}
                    onPress={this.eventFavMiscAction}
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
        locale: store.settings.locale,
        favorites: store.data.favorites,
        config: store.settings.config
    };
}

module.exports = connect(select)(EventListView);
