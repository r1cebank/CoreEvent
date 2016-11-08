import Shortid from 'shortid';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import React, { Component } from 'react';
import { View, ScrollView, Text, InteractionManager } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button, ListItem } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';
import Geocoder from 'react-native-geocoder';

import styles from './resources/styles';
import { Colors, Languages, Store, Actions } from '../../global/globalIncludes';

class NewEventView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            city: {},
            state: {},
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
    onCitySelect = async (city, state) => {
        let geocode;
        try {
            geocode = await Geocoder.geocodeAddress(`${state.n}${city.n}`);
        } catch (e) {
            // Report error
        }
        this.setState({ city, geocode, state });
    }
    onInterestSelect = (interests) => {
        this.setState({ interests });
    }
    getInterestSubtitle = () => {
        if (this.state.interests.length) {
            return this.state.interests.map((interest) => {
                return Languages.f(interest.name, this.props.locale);
            }).join(' ');
        }
        return Languages.t('eventInterestSubtitle', this.props.locale);
    }
    checkCreate = () => {
        return !(!!this.state.eventName && !!this.state.eventDescription &&
                !!this.state.city.n && !!this.state.interests.length);
    }
    createDraft = () => {
        const event = {
            id: Shortid.generate(),
            city: this.state.city,
            state: this.state.state,
            geocode: this.state.geocode,
            name: this.state.eventName,
            interests: this.state.interests,
            description: this.state.eventDescription,
            created: new Date()
        };
        Store.appStore.dispatch(Actions.Data
                .addDraft(event));
        RouterActions.pop({
            refresh: {
                showNotice: true,
                notice: {
                    icon: 'check',
                    color: Colors.green,
                    header: Languages.t('success', this.props.locale),
                    notice: Languages.t('draftCreated', this.props.locale)
                }
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
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
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
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
                                this.state.city.n && styles.itemWithSelection
                            ]}
                            title={Languages.t('eventDate', this.props.locale)}
                            subtitle={undefined}
                            subtitleStyle={styles.itemSubtitle}
                            titleStyle={styles.itemSelectorTitle}
                            onPress={() => {
                                this.setState({
                                    isDateTimePickerVisible: true
                                });
                            }}
                        />
                        <Hoshi
                            label={Languages.t('eventDescription', this.props.locale)}
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
                                this.state.city.n && styles.itemWithSelection
                            ]}
                            title={Languages.t('eventLocation', this.props.locale)}
                            subtitle={
                                this.state.city.n ? `${this.state.state.n}${this.state.city.n}` :
                                        undefined
                            }
                            subtitleStyle={styles.itemSubtitle}
                            titleStyle={styles.itemSelectorTitle}
                            onPress={() => {
                                InteractionManager.runAfterInteractions(() => {
                                    RouterActions.locationSelector({
                                        onCitySelect: this.onCitySelect
                                    });
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
                            onPress={this.createDraft}
                            disabled={this.checkCreate()}
                            backgroundColor={Colors.infraRed}
                            buttonStyle={styles.button}
                            title={Languages.t('start', this.props.locale)} />
                    </View>
                </ScrollView>
                <DateTimePicker
                    mode="datetime"
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={() =>{}}
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
