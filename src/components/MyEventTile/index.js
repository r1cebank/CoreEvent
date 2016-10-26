/*
 *  ExpandableText element
 */

import React, { Component } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import { Text, View, Image } from 'react-native';
import dateFormat from 'dateformat';

import { Colors, Languages } from '../../global/globalIncludes';
import styles from './resources/styles';

const status = {
    joined: {
        title: 'going',
        icon: 'check-circle',
        style: styles.statusIconStyle
    }
};

class MyEventTile extends Component {
    static propTypes = {
        eventTitle: React.PropTypes.string,
        imageSource: React.PropTypes.any,
        onPressStatus: React.PropTypes.func,
        venueName: React.PropTypes.string,
        locale: React.PropTypes.string,
        status: React.PropTypes.string,
        venueAddress: React.PropTypes.string,
        startTime: React.PropTypes.instanceOf(Date)
    }
    render() {
        return (
            <Card
                imageStyle={styles.cardImage}
                containerStyle={styles.cardContainer}
                title={this.props.eventTitle}
                titleStyle={styles.titleStyle}>
                <Image
                    style={styles.imageStyle}
                    source={this.props.imageSource} />
                <Button
                    borderRadius={15}
                    buttonStyle={styles.statusButton}
                    textStyle={styles.statusText}
                    backgroundColor={Colors.green}
                    onPress={this.props.onPressStatus}
                    icon={{
                        name: status[this.props.status].icon,
                        style: status[this.props.status].style
                    }}
                    title={Languages.t(status[this.props.status].title, this.props.locale)} />
                <View style={styles.infoContainer}>
                    <Icon name="schedule" size={20} color={Colors.grey} />
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateVenueText}>
                            {dateFormat(this.props.startTime, 'dddd, mmm dd yyyy')}
                        </Text>
                        <Text>
                            {dateFormat(this.props.startTime, 'hh:MM TT')}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Icon name="location-on" size={20} color={Colors.grey} />
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateVenueText}>{this.props.venueName}</Text>
                        <Text>{this.props.venueAddress}</Text>
                    </View>
                </View>
            </Card>
        );
    }
}

module.exports = MyEventTile;
