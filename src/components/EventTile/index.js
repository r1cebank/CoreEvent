/*
 *  ExpandableText element
 */

import React, { Component } from 'react';
import { Icon, Button } from 'react-native-elements';
import { Col, Grid } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dateFormat from 'dateformat';

import { Colors, Components } from '../../global/globalIncludes';
import styles from './resources/styles';

class EventTile extends Component {
    static propTypes = {
        eventTitle: React.PropTypes.string,
        simple: React.PropTypes.bool,
        onPress: React.PropTypes.func,
        venueName: React.PropTypes.string,
        locale: React.PropTypes.string,
        venueAddress: React.PropTypes.string,
        description: React.PropTypes.string,
        ctaTitle: React.PropTypes.string,
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
                colors={[ Colors.cyan, Colors.royalPurple ]}
                style={styles.eventCard}>
                <View>
                    <Text style={styles.title}>
                        {this.props.eventTitle}
                    </Text>
                    <View style={styles.timeVenue}>
                        <Icon name="schedule" size={20} color={Colors.frontColor} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.timeVenueText}>
                                {this.props
                                    .startTime.toLocaleDateString(this.props.locale, options)}
                            </Text>
                            <Text style={styles.timeVenueSecondaryText}>
                                {dateFormat(this.props.startTime, 'hh:MM TT')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.timeVenue}>
                        <Icon name="location-on" size={20} color={Colors.frontColor} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.timeVenueText}>
                                {this.props.venueName}
                            </Text>
                            <Text style={styles.timeVenueSecondaryText}>
                                {this.props.venueAddress}
                            </Text>
                        </View>
                    </View>
                    {(() => {
                        if (this.props.simple) {
                            return (
                                <Text style={styles.description}>
                                    {this.props.description.slice(0, 100)}...
                                </Text>
                            );
                        }
                        return (
                            <Components.ExpandableText style={{ marginBottom: 10 }}>
                                {this.props.description}
                            </Components.ExpandableText>
                        );
                    })()}
                    <Grid>
                        <Col size={4}>
                            <Button
                                small
                                icon={{ name: 'add' }}
                                backgroundColor="transparent"
                                fontFamily="NotoSans-Bold"
                                buttonStyle={styles.eventCardCTA}
                                onPress={this.props.onPress}
                                textStyle={{ textAlign: 'center' }}
                                title={this.props.ctaTitle} />
                        </Col>
                        <Col size={1}>
                            <Button
                                small
                                icon={{ name: 'more-horiz', style: styles.etcIconStyle }}
                                backgroundColor="transparent"
                                fontFamily="NotoSans-Bold"
                                buttonStyle={styles.eventCardSecondary} />
                        </Col>
                    </Grid>
                </View>
            </LinearGradient>
        );
    }
}

module.exports = EventTile;
