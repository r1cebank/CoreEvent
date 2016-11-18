import { connect } from 'react-redux';
import { Card, Icon } from 'react-native-elements';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import dateFormat from 'dateformat';
import QRCode from 'react-native-qrcode';
import { Actions as RouterActions } from 'react-native-router-flux';


import { Languages, Store, Colors, Actions } from '../../global/globalIncludes';

import styles from './resources/styles';

class QRViewer extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        event: React.PropTypes.object
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('viewQR', this.props.locale) });
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
                <Card
                    wrapperStyle={{alignItems: 'center', justifyContent: 'center'}}
                    title={this.props.event.get('name')}>
                    <View style={{ alignItems:'flex-start'}}>
                        <View style={styles.timeVenue}>
                            <Icon name="schedule" size={20} color={Colors.grey} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.timeVenueText}>
                                    {this.props
                                        .event.get('start').toLocaleDateString(this.props.locale, options)}
                                </Text>
                                <Text style={styles.timeVenueSecondaryText}>
                                    {dateFormat(this.props.event.get('start'), 'hh:MM TT')}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.timeVenue}>
                            <Icon name="location-on" size={20} color={Colors.grey} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.timeVenueText}>
                                    {this.props.event.get('location').name}
                                </Text>
                                <Text style={styles.timeVenueSecondaryText}>
                                    {this.props.event.get('location').address}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <QRCode
                        value={`{"eventId":"${this.props.event.id}"}`}
                        size={200}
                        bgColor="black"
                        fgColor="white" />
                </Card>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(QRViewer);
