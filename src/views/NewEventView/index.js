import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button, FormLabel, FormInput, ListItem } from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import { Isao, Hoshi } from 'react-native-textinput-effects';

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
                    <Text style={{ color: Colors.frontColor, fontSize: 30, fontWeight: '700', backgroundColor: 'transparent'}}>
                        {Languages.t('newEvent', this.props.locale)}
                    </Text>
                    <Text style={{ margin: 10, paddingLeft: 10, paddingRight: 10, color: Colors.frontColor, fontSize: 15, backgroundColor: 'transparent', textAlign: 'center'}}>
                        Find people who share the same interest as you, learn from them and accomplish something
                    </Text>
                </LinearGradient>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <View style={{ marginTop: 10 }}>
                        <Hoshi
                            label={'Event Name'}
                            style={{borderBottomWidth: 1, marginTop: 10}}
                            labelStyle={{ color: '#6a7989', fontSize: 16, marginLeft: 14 }}
                            borderColor={Colors.infraRed}
                            backgroundColor={Colors.backgroundColor}
                        />
                        <Hoshi
                            label={'Description'}
                            style={{borderBottomWidth: 1, marginTop: 10}}
                            labelStyle={{ color: '#6a7989', fontSize: 16, marginLeft: 14 }}
                            borderColor={Colors.infraRed}
                            backgroundColor={Colors.backgroundColor}
                        />
                        <ListItem
                            wrapperStyle={{ padding: 10, paddingTop: 20 }}
                            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#b9c1ca', padding: 10 }}
                            title="Event Location"
                            titleStyle={{ color: '#6a7989', fontSize: 16, marginLeft: 0 }}
                            onPress={() => {}}
                        />
                        <ListItem
                            wrapperStyle={{ padding: 10, paddingTop: 20 }}
                            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#b9c1ca', padding: 10 }}
                            title="For people interested in"
                            subtitle="Select a few topics"
                            titleStyle={{ color: '#6a7989', fontSize: 16, marginLeft: 0 }}
                            onPress={() => {}}
                        />
                    </View>
                </ScrollView>
                <View style={{ flex: 2, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <Button
                        onPress={this.logout}
                        backgroundColor={Colors.infraRed}
                        buttonStyle={{ borderRadius: 40 }}
                        title={Languages.t('start', this.props.locale)} />
                </View>
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
