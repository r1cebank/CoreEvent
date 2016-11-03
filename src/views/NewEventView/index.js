import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button, ListItem } from 'react-native-elements';
import { Hoshi } from 'react-native-textinput-effects';

import styles from './resources/styles';
import { Colors, Languages, Icons } from '../../global/globalIncludes';

class NewEventView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('newEvent', this.props.locale) });
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
                            labelStyle={styles.inputLabel}
                            borderColor={Colors.infraRed}
                            backgroundColor={Colors.backgroundColor}
                        />
                        <Hoshi
                            label={Languages.t('eventDescription', this.props.locale)}
                            style={styles.input}
                            labelStyle={styles.inputLabel}
                            borderColor={Colors.infraRed}
                            backgroundColor={Colors.backgroundColor}
                        />
                        <ListItem
                            wrapperStyle={styles.itemSelector}
                            containerStyle={styles.itemSelectorContainer}
                            title={Languages.t('eventLocation', this.props.locale)}
                            titleStyle={styles.itemSelectorTitle}
                            onPress={() => {}}
                        />
                        <ListItem
                            wrapperStyle={styles.itemSelector}
                            containerStyle={styles.itemSelectorContainer}
                            title={Languages.t('eventInterest', this.props.locale)}
                            subtitle={Languages.t('eventInterestSubtitle', this.props.locale)}
                            titleStyle={styles.itemSelectorTitle}
                            onPress={() => {}}
                        />
                        <Button
                            onPress={this.logout}
                            backgroundColor={Colors.infraRed}
                            buttonStyle={styles.button}
                            title={Languages.t('start', this.props.locale)} />
                    </View>
                </ScrollView>
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
