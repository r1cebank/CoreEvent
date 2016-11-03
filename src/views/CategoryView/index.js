import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    InteractionManager,
    Text,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Languages, Colors, Components } from '../../global/globalIncludes';
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
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            rowData % 2 ? styles.rightItem : styles.leftItem,
                                            styles.categoryItem,
                                            { backgroundColor: rowData.color }
                                        ]}
                                        onPress={() => {
                                            InteractionManager.runAfterInteractions(() => {
                                                Actions.categoryChildView({ category: rowData });
                                            });
                                        }}>
                                        <Text style={styles.categoryItemText}>
                                            {Languages.f(rowData.name, this.props.locale)}
                                        </Text>
                                    </TouchableOpacity>
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
