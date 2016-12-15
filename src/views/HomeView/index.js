import { connect } from 'react-redux';
import DialogBox from 'react-native-dialogbox';
import React, { Component } from 'react';
import { Icon, Button } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
// import Carousel from 'react-native-looped-carousel';
// import PullToRefresh from 'react-native-animated-ptr';
import ActionSheet from 'react-native-actionsheet';
import { Actions as RouterActions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import {
    View,
    Text,
    ScrollView,
    InteractionManager,
    TouchableOpacity,
    RefreshControl,
    ListView
} from 'react-native';

import {
    Colors,
    Languages,
    Components,
    Storage,
    Views,
    Store,
    Actions
} from '../../global/globalIncludes';
import styles from './resources/styles';

class HomeView extends Component {
    static propTypes = {
        config: React.PropTypes.object,
        searchRadius: React.PropTypes.number,
        location: React.PropTypes.object,
        locale: React.PropTypes.string,
        favorites: React.PropTypes.array,
        hidden: React.PropTypes.array,
        modalEventID: React.PropTypes.string,
        showModal: React.PropTypes.bool,
        showNotice: React.PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            notice: {},
            attendances: [],
            nearbyEvents: [],
            // loading: true,
            showNotice: false,
            isRefreshing: false,
            nearbyDatasource: this.ds.cloneWithRows([])
        };
    }
    async componentDidMount() {
        RouterActions.refresh({
            renderTitle: (navProps) => {
                return (
                    <TouchableOpacity
                        style={{
                            top: 22,
                            padding: 8,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            InteractionManager.runAfterInteractions(() => {
                                RouterActions.addressSearcherPush({
                                    onSelect: this.onAddressSelect
                                });
                            });
                        }}>
                        <Text style={navProps.titleStyle}>
                            {this.props.location.name}
                        </Text>
                        <Icon
                            color={Colors.infraRed}
                            name="keyboard-arrow-down" />
                    </TouchableOpacity>
                );
            }
        });
        // Fetch nearby events
        await this.refreshAttending();
        await this.refreshEvents(this.props.location.location, this.props.searchRadius);
        this.subscribeLocation();
        this.subscribeAttending();
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.showNotice !== this.props.showNotice) {
            if (nextProps.showNotice && nextProps.notice) {
                this.setState({
                    notice: nextProps.notice
                });
                this.popupDialog.openDialog();
                RouterActions.refresh({ showNotice: false });
            }
        }
        if (nextProps.location.name !== this.props.location.name) {
            await this.refreshEvents(nextProps.location.location, this.props.searchRadius);
        }
        if (nextProps.searchRadius !== this.props.searchRadius) {
            await this.refreshEvents(this.props.location.location, nextProps.searchRadius);
        }
        if (nextProps.showModal !== this.props.showModal) {
            if (nextProps.modalEventData) {
                this.setState({
                    modalEventData: nextProps.modalEventData,
                    modalLocationData: nextProps.modalLocationData
                });
                this.eventModal.open();
                RouterActions.refresh({ showModal: false });
            }
        }
    }
    componentWillUnmount() {
        this.nearbySubscription.unsubscribe();
    }
    subscribeLocation = () => {
        this.nearbySubscription = Storage.Event
            .fetchByLocationSubscription(this.props.location.location, this.props.searchRadius);
        this.nearbySubscription.on('create', this.appendEvent);
    }
    subscribeAttending = () => {
        this.attendingSubscription = Storage.Attendance
            .fetchMineSubscription();
        this.attendingSubscription.on('create', this.appendAttendance);
        this.attendingSubscription.on('delete', this.removeAttendance);
    }
    appendEvent = (object) => {
        // Append event to the state
        const newEvents = this.state.nearbyEvents.slice(0);
        newEvents.push(object);
        this.setState({
            nearbyEvents: newEvents,
            nearbyDatasource: this.ds.cloneWithRows(newEvents)
        });
    }
    removeAttendance = (object) => {
        const attendances = this.state.attendances.slice(0);
        const newAttendances = attendances.filter((attendance) => {
            return object.get('event').id !== attendance.get('event').id;
        });
        this.setState({
            attendances: newAttendances,
            nearbyDatasource: this.ds.cloneWithRows(this.state.nearbyEvents)
        });
    }
    appendAttendance = (object) => {
        // Append event to the state
        const attendances = this.state.attendances.slice(0);
        attendances.push(object);
        this.setState({
            attendances,
            nearbyDatasource: this.ds.cloneWithRows(this.state.nearbyEvents)
        });
    }
    isAttending = (event) => {
        return !!this.state.attendances.filter((attendance) => {
            return attendance.get('event').id === event.id;
        }).length;
    }
    refreshAttending = async () => {
        const attendances = await Storage.Attendance.fetchMine();
        this.setState({ attendances });
    }
    refreshEvents = async (location, radius) => {
        this.setState({ loading: true });
        const events = await Storage.Event.fetchByLocation(location,
            radius);
        this.setState({
            nearbyEvents: events,
            nearbyDatasource: this.ds.cloneWithRows(events)
        });
        this.setState({ loading: false });
    }
    onAddressSelect = (address) => {
        Store.appStore.dispatch(Actions.Settings.updateLocation({
            name: address.name,
            location: address.location
        }));
    }
    eventAction = () => {
        this.eventActionSheet.show();
    }
    editStatus = () => {
        this.editActionSheet.show();
    }
    onRefresh = async () => {
        this.setState({ isRefreshing: true });
        await this.refreshEvents(this.props.location.location, this.props.searchRadius);
        this.setState({ isRefreshing: false });
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
    updateDistance = (index) => {
        if (index === 1) {
            Store.appStore.dispatch(Actions.Settings.updateRadius(2));
        } else if (index === 2) {
            Store.appStore.dispatch(Actions.Settings.updateRadius(5));
        } else if (index === 3) {
            Store.appStore.dispatch(Actions.Settings.updateRadius(10));
        } else if (index === 4) {
            Store.appStore.dispatch(Actions.Settings.updateRadius(30));
        }
    }
    showNotice = (notice) => {
        this.setState({
            notice
        });
        this.popupDialog.openDialog();
    }
    confirmQuit = (event) => {
        this.dialogbox.confirm({
            content: Languages.t('leaveConfirm', this.props.locale),
            ok: {
                callback: async () => {
                    await Storage.Attendance.leave(event);
                }
            }
        });
    }
    renderEmpty = () => {
        return (
            <Components.EmptyList
                message={Languages.t('noEventsFound', this.props.locale)}
                onPress={RouterActions.newEvent}
                buttonText={Languages.t('createOne', this.props.locale)}
                />
        );
    }
    renderNearbyRow = (rowData) => {
        const isAttending = this.isAttending(rowData);
        return (
            <Components.EventTile
                style={styles.nearbyTile}
                attending={isAttending}
                eventTitle={rowData.get('name')}
                locale={this.props.locale}
                venueName={rowData.get('location').name}
                venueAddress={rowData.get('location').address}
                onPress={() => this.attend(rowData)}
                onPressAlt={() => {
                    if (isAttending) {
                        this.confirmQuit(rowData);
                    }
                }}
                onPressSecondary={() => this.openEventMisc(rowData)}
                description={rowData.get('description')}
                ctaTitle={Languages.t('addToMe', this.props.locale)}
                ctaAltTitle={Languages.t('attending', this.props.locale)}
                startTime={rowData.get('start')} />
        );
    }
    render() {
        const ActionSheetOptions = {
            eventMisc: {
                options: [
                    Languages.t('cancel', this.props.locale),
                    Languages.t('favorite', this.props.locale),
                    Languages.t('hide', this.props.locale),
                    Languages.t('report', this.props.locale)
                ],
                CANCEL_INDEX: 0,
                DESTRUCTIVE_INDEX: 3
            },
            eventMiscFav: {
                options: [
                    Languages.t('cancel', this.props.locale),
                    Languages.t('removeFav', this.props.locale),
                    Languages.t('hide', this.props.locale),
                    Languages.t('report', this.props.locale)
                ],
                CANCEL_INDEX: 0,
                DESTRUCTIVE_INDEX: 3
            },
            distance: {
                options: [
                    Languages.t('cancel', this.props.locale),
                    `2 ${Languages.t('km', this.props.locale)}`,
                    `5 ${Languages.t('km', this.props.locale)}`,
                    `10 ${Languages.t('km', this.props.locale)}`,
                    `30 ${Languages.t('km', this.props.locale)}`
                ],
                CANCEL_INDEX: 0,
                DESTRUCTIVE_INDEX: 3
            }
        };
        const nearbyDatasource = this.ds.cloneWithRows(this.state.nearbyEvents.filter((event) => {
            return this.props.hidden.indexOf(event.id) < 0;
        }));
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
                            tintColor={Colors.infraRed}
                        />
                    }>
                    <View style={styles.container}>
                        <View>
                            <View style={styles.headerContainer}>
                                <Text style={styles.header}>
                                    {Languages.t('aroundme', this.props.locale)}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => this.distanceActionsheet.show()}>
                                    <Text style={styles.header}>
                                        {this.props.searchRadius} {Languages
                                            .t('km', this.props.locale)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.recommendedContainer}>
                                {(() => {
                                    if (this.state.loading && !this.state.isRefreshing) {
                                        return (
                                            <Views.LoadingView />
                                        );
                                    } else if (nearbyDatasource.getRowCount() < 1) {
                                        return this.renderEmpty();
                                    }
                                    return (
                                        <ListView
                                            style={styles.list}
                                            keyboardShouldPersistTaps={true}
                                            enableEmptySections={true}
                                            dataSource={nearbyDatasource}
                                            renderRow={this.renderNearbyRow} />
                                    );
                                })()}
                            </View>
                        </View>
                    </View>
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
                <Modal style={styles.eventModal} position="bottom" ref={(c) => this.eventModal = c}>
                    <Icon name="keyboard-arrow-down" size={30} color={Colors.secondary} />
                    {(() => {
                        if (this.state.modalEventData) {
                            return (
                                <Components.EventTile
                                    eventTitle={this.state.modalEventData.get('name')}
                                    locale={this.props.locale}
                                    venueName={this.state.modalEventData.get('location').name}
                                    venueAddress={this.state.modalEventData.get('location').address}
                                    onPress={() => this.attend(this.state.modalEventData)}
                                    onPressSecondary={() => {
                                        this.openEventMisc(this.state.modalEventData);
                                    }}
                                    description={this.state.modalEventData.get('description')}
                                    ctaTitle={Languages.t('addToMe', this.props.locale)}
                                    startTime={this.state.modalEventData.get('start')} />
                            );
                        }
                        return null;
                    })()}
                </Modal>
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
                <ActionSheet
                    ref={(o) => this.distanceActionsheet = o}
                    options={ActionSheetOptions.distance.options}
                    cancelButtonIndex={ActionSheetOptions.distance.CANCEL_INDEX}
                    onPress={this.updateDistance}
                />
                <DialogBox ref={(dialogbox) => this.dialogbox = dialogbox} />
            </View>
        );
    }
}

HomeView.defaultProps = {
    selectedTab: 'home',
    location: {
        name: ''
    },
    config: { attributes: {} }
};

function select(store) {
    return {
        searchRadius: store.settings.searchRadius,
        favorites: store.data.favorites,
        hidden: store.data.hidden,
        location: store.settings.location,
        locale: store.settings.locale,
        inDebug: store.settings.inDebug,
        loading: store.utils.loading,
        config: store.settings.config
    };
}

module.exports = connect(select)(HomeView);
