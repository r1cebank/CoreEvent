import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { ListItem, List } from 'react-native-elements';

import { Languages, Colors } from '../../global/globalIncludes';

import styles from './resources/styles';

class ChildLocationSelectorView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        onCitySelect: React.PropTypes.func,
        city: React.PropTypes.object
    }
    componentWillMount() {
        RouterActions.refresh({ title: this.props.city.name });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <List containerStyle={styles.listContainer}>
                        {(() => {
                            return this.props.city.cities[0].cities.map((city, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        wrapperStyle={{ padding: 5 }}
                                        title={city.name}
                                        chevronColor={Colors.infraRed}
                                        onPress={() => {
                                            this.props.onCitySelect(city);
                                            RouterActions.pop();
                                            setTimeout(() => {
                                                RouterActions.pop();
                                            }, 100);
                                        }}
                                        titleStyle={styles.titleStyle}
                                    />
                                );
                            });
                        })()}
                    </List>
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

module.exports = connect(select)(ChildLocationSelectorView);
