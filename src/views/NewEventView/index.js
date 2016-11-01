import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
import { Isao } from 'react-native-textinput-effects';

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
                </LinearGradient>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <View style={{ marginTop: 10 }}>
                            <Isao
                                label={'Event Name'}
                                activeColor={Colors.infraRed}
                                passiveColor={Colors.secondary}
                            />
                        <Text>Event Date</Text>
                            <CalendarStrip />
                    </View>
                </ScrollView>
                <View style={{ flex: 2, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <Button
                        onPress={this.logout}
                        backgroundColor={Colors.infraRed}
                        buttonStyle={{ borderRadius: 40 }}
                        title={Languages.t('host', this.props.locale)} />
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
