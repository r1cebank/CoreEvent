import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    InteractionManager
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Languages, Components } from '../../global/globalIncludes';
import styles from './resources/styles';

class CategoryView extends Component {
    static propTypes = {
        category: React.PropTypes.array,
        locale: React.PropTypes.string
    }
    componentWillMount() {
        Actions.refresh({ title: Languages.t('interestsLC', this.props.locale) });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <View style={styles.list}>
                        {(() => {
                            return this.props.category.map((rowData, index) => {
                                return (
                                    <Components.CategoryTile
                                        key={index}
                                        index={index}
                                        onPress={() => {
                                            InteractionManager.runAfterInteractions(() => {
                                                Actions.categoryChildView({ category: rowData });
                                            });
                                        }}
                                        color={rowData.color}
                                        name={Languages.f(rowData.name, this.props.locale)} />
                                );
                            });
                        })()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function select(store) {
    return {
        category: store.data.category,
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(CategoryView);
