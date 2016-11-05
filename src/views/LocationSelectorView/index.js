import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, InteractionManager } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { ListItem, List } from 'react-native-elements';

import { Languages, Colors } from '../../global/globalIncludes';

import CNCities from './resources/cncities.json';
import CN from './resources/cn.json';
import styles from './resources/styles';

class LocationSelectorView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        onCitySelect: React.PropTypes.func
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('eventLocation', this.props.locale) });
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
                            return CN.l.map((state, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        wrapperStyle={{ padding: 5 }}
                                        title={state.n}
                                        chevronColor={Colors.infraRed}
                                        onPress={() => {
                                            InteractionManager.runAfterInteractions(() => {
                                                RouterActions.childLocationSelector({
                                                    state,
                                                    onCitySelect: this.props.onCitySelect
                                                });
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

module.exports = connect(select)(LocationSelectorView);
