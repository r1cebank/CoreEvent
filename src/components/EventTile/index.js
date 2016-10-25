/*
 *  ExpandableText element
 */

import React, { Component } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import { Col, Grid } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import dateFormat from 'dateformat';

import { Colors, Components } from '../../global/globalIncludes';
import styles from './resources/styles';

class EventTile extends Component {
    static propTypes = {
        eventTitle: React.PropTypes.string,
        imageSource: React.PropTypes.any,
        simple: React.PropTypes.bool,
        venueName: React.PropTypes.string,
        venueAddress: React.PropTypes.string,
        description: React.PropTypes.string,
        ctaTitle: React.PropTypes.string,
        startTime: React.PropTypes.instanceOf(Date)
    }
    render() {
        return (
            <Card
                containerStyle={styles.eventCard}
                title={this.props.eventTitle}
                titleStyle={{ fontWeight: 'bold' }}
                image={this.props.simple ? null : this.props.imageSource} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="schedule" size={20} color={Colors.grey} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {dateFormat(this.props.startTime, 'dddd, mmm dd yyyy')}
                        </Text>
                        <Text>
                            {dateFormat(this.props.startTime, 'hh:MM TT')}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="location-on" size={20} color={Colors.grey} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.props.venueName}</Text>
                        <Text>{this.props.venueAddress}</Text>
                    </View>
                </View>
                {(() => {
                    if (this.props.simple) {
                        return (
                            <Text style={{ marginBottom: 10 }}>
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
                            backgroundColor={Colors.primary}
                            fontFamily="NotoSans-Bold"
                            buttonStyle={styles.eventCardCTA}
                            title={this.props.ctaTitle} />
                    </Col>
                    <Col size={1}>
                        <Button
                            small
                            icon={{ name: 'more-horiz', style: styles.etcIconStyle }}
                            backgroundColor={Colors.secondary}
                            fontFamily="NotoSans-Bold"
                            buttonStyle={styles.eventCardSecondary} />
                    </Col>
                </Grid>
            </Card>
        );
    }
}

module.exports = EventTile;
