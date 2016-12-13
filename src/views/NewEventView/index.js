import Shortid from 'shortid';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, { Component } from 'react';
import { View, Text, InteractionManager, ScrollView, findNodeHandle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button, ListItem } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import Geocoder from 'react-native-geocoder';

import styles from './resources/styles';
import { Colors, Languages, Storage } from '../../global/globalIncludes';

class NewEventView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            address: {},
            detailedAddress: '',
            interests: [],
            eventDescription: '',
            eventName: ''
        };
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('newEvent', this.props.locale) });
    }
    onChangeEventName = (eventName) => {
        this.setState({ eventName });
    }
    onChangeEventDescription = (eventDescription) => {
        this.setState({ eventDescription });
    }
    onChangeDetailedAddress = (detailedAddress) => {
        this.setState({ detailedAddress });
    }
    onAddressSelect = (address) => {
        this.setState({ address });
    }
    onInterestSelect = (interests) => {
        this.setState({ interests });
    }
    getInterestSubtitle = () => {
        if (this.state.interests.length) {
            return this.state.interests.map((interest) => {
                return Languages.f(interest.get('name'), this.props.locale);
            }).join(' ');
        }
        return Languages.t('eventInterestSubtitle', this.props.locale);
    }
    checkCreate = () => {
        return !!this.state.eventName && !!this.state.eventDescription &&
                !!this.state.address && !!this.state.interests.length &&
                !!this.state.date && !!this.state.detailedAddress;
    }
    createEvent = async () => {
        const event = {
            id: Shortid.generate(),
            address: this.state.address,
            geocode: this.state.geocode,
            name: this.state.eventName,
            detailedAddress: this.state.detailedAddress,
            interests: this.state.interests,
            description: this.state.eventDescription,
            date: this.state.date
        };
        try {
            const response = await Storage.Event.create(event);
            RouterActions.pop({
                refresh: {
                    showNotice: true,
                    notice: {
                        icon: 'check',
                        color: Colors.green,
                        header: Languages.t('success', this.props.locale),
                        notice: Languages.t('eventCreated', this.props.locale)
                    }
                }
            });
        } catch (e) {
            RouterActions.pop({
                refresh: {
                    showNotice: true,
                    notice: {
                        icon: 'error',
                        color: Colors.infraRed,
                        header: Languages.t('error', this.props.locale),
                        notice: Languages.t('eventCreateError', this.props.locale)
                    }
                }
            });
        }
    }
    inputFocused = (refName) => {
        setTimeout(() => {
            const scrollResponder = this.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            findNodeHandle(this[refName].refs.input), 100, true);
        }, 50);
    }
    inputLostFocus = (refName) => {
        setTimeout(() => {
            const scrollResponder = this.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            findNodeHandle(this[refName].refs.input), -100, true);
        }, 50);
    }
    render() {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={true}
                    style={styles.scrollView}>
                    <LinearGradient
                        colors={[ Colors.royalPurple, Colors.infraRed ]}
                        style={styles.headerContainer}>
                        <Text style={styles.header}>
                            {Languages.t('newEvent', this.props.locale)}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {Languages.t('newEventSubtitle', this.props.locale)}
                        </Text>
                    </LinearGradient>
                    <View style={{ marginTop: 10 }}>
                        <Hoshi
                            label={Languages.t('eventName', this.props.locale)}
                            style={styles.input}
                            inputStyle={styles.inputText}
                            onChangeText={this.onChangeEventName}
                            labelStyle={styles.inputLabel}
                            borderColor={Colors.infraRed}
                            backgroundColor={Colors.backgroundColor}
                        />
                        <ListItem
                            wrapperStyle={styles.itemSelector}
                            containerStyle={[
                                styles.itemSelectorContainer,
                                this.state.address.name && styles.itemWithSelection
                            ]}
                            title={Languages.t('eventLocation', this.props.locale)}
                            subtitle={this.state.address.name}
                            subtitleStyle={styles.itemSubtitle}
                            titleStyle={styles.itemSelectorTitle}
                            onPress={() => {
                                InteractionManager.runAfterInteractions(() => {
                                    RouterActions.addressSearcher({
                                        onSelect: this.onAddressSelect
                                    });
                                });
                            }}
                        />
                        <Hoshi
                            ref={c => this.detailedAddress = c}
                            label={Languages.t('longAddress', this.props.locale)}
                            onFocus={() => this.inputFocused('detailedAddress')}
                            onEndEditing={() => this.inputLostFocus('detailedAddress')}
                            style={styles.input}
                            inputStyle={styles.inputText}
                            onChangeText={this.onChangeDetailedAddress}
                            labelStyle={styles.inputLabel}
                            borderColor={Colors.infraRed}
                            backgroundColor={Colors.backgroundColor}
                        />
                        <Hoshi
                            ref={c => this.descriptionField = c}
                            label={Languages.t('eventDescription', this.props.locale)}
                            onFocus={() => this.inputFocused('descriptionField')}
                            onEndEditing={() => this.inputLostFocus('descriptionField')}
                            style={styles.input}
                            inputStyle={styles.inputText}
                            onChangeText={this.onChangeEventDescription}
                            labelStyle={styles.inputLabel}
                            borderColor={Colors.infraRed}
                            backgroundColor={Colors.backgroundColor}
                        />
                        <ListItem
                            wrapperStyle={styles.itemSelector}
                            containerStyle={[
                                styles.itemSelectorContainer,
                                this.state.date && styles.itemWithSelection
                            ]}
                            title={Languages.t('eventDate', this.props.locale)}
                            subtitle={this.state.date ?
                                this.state.date.toLocaleDateString(this.props.locale, options) :
                                undefined
                            }
                            subtitleStyle={styles.itemSubtitle}
                            titleStyle={styles.itemSelectorTitle}
                            onPress={() => {
                                this.setState({
                                    isDateTimePickerVisible: true
                                });
                            }}
                        />
                        <ListItem
                            wrapperStyle={styles.itemSelector}
                            containerStyle={[
                                styles.itemSelectorContainer,
                                this.state.interests.length && styles.itemWithSelection
                            ]}
                            title={Languages.t('eventInterest', this.props.locale)}
                            subtitle={this.getInterestSubtitle()}
                            subtitleStyle={styles.itemSubtitle}
                            titleStyle={styles.itemSelectorTitle}
                            onPress={() => {
                                InteractionManager.runAfterInteractions(() => {
                                    RouterActions.categorySelector({
                                        selectedInterest: this.state.interests,
                                        onInterestSelect: this.onInterestSelect
                                    });
                                });
                            }} />
                        <Button
                            onPress={this.createEvent}
                            disabled={!this.checkCreate()}
                            backgroundColor={Colors.infraRed}
                            buttonStyle={styles.button}
                            title={Languages.t('start', this.props.locale)} />
                    </View>
                </ScrollView>
                <DateTimePicker
                    mode="datetime"
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={(date) => {
                        this.setState({ date });
                        this.setState({ isDateTimePickerVisible: false });
                    }}
                    titleIOS={Languages.t('pickDate', this.props.locale)}
                    cancelTextIOS={Languages.t('cancel', this.props.locale)}
                    confirmTextIOS={Languages.t('confirm', this.props.locale)}
                    minDateAndroid={new Date()}
                    onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                />
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(NewEventView);
