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
        state: React.PropTypes.object
    }
    componentWillMount() {
        RouterActions.refresh({ title: this.props.state.n });
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
                            return this.props.state.l.map((city, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        wrapperStyle={{ padding: 5 }}
                                        title={city.n}
                                        chevronColor={Colors.infraRed}
                                        onPress={() => {
                                            this.props.onCitySelect(city, this.props.state);
                                            RouterActions.addressSearcher({
                                                city,
                                                state: this.props.state
                                            });
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
