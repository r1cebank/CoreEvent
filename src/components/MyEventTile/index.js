/*
 *  ExpandableText element
 */

import React, { Component } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import { Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dateFormat from 'dateformat';

import { Colors, Languages } from '../../global/globalIncludes';
import styles from './resources/styles';

class MyEventTile extends Component {
    static propTypes = {
        eventTitle: React.PropTypes.string,
        onPressStatus: React.PropTypes.func,
        venueName: React.PropTypes.string,
        locale: React.PropTypes.string,
        status: React.PropTypes.string,
        venueAddress: React.PropTypes.string,
        startTime: React.PropTypes.instanceOf(Date)
    }
    render() {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return (
            <LinearGradient
                colors={[ Colors.infraRed, Colors.redTangelo ]}
                style={styles.cardContainer}>
                <Card
                    imageStyle={styles.cardImage}
                    dividerStyle={{ height: 0 }}
                    containerStyle={styles.card}
                    title={this.props.eventTitle}
                    titleStyle={styles.titleStyle}>
                    <View style={styles.infoContainer}>
                        <Icon name="schedule" size={20} color={Colors.frontColor} />
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.dateVenueText}>
                                {this.props
                                    .startTime.toLocaleDateString(this.props.locale, options)}
                            </Text>
                            <Text style={styles.dateVenueSecondaryText}>
                                {dateFormat(this.props.startTime, 'hh:MM TT')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Icon name="location-on" size={20} color={Colors.frontColor} />
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.dateVenueText}>
                                {this.props.venueName}
                            </Text>
                            <Text style={styles.dateVenueSecondaryText}>
                                {this.props.venueAddress}
                            </Text>
                        </View>
                    </View>
                </Card>
            </LinearGradient>
        );
    }
}

module.exports = MyEventTile;
