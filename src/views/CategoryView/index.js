import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

import { Languages } from '../../global/globalIncludes';
import styles from './resources/styles';

class CategoryView extends Component {
    static propTypes = {
        category: React.PropTypes.array,
        locale: React.PropTypes.string
    }
    componentWillMount() {
        Actions.refresh({ title: Languages.t('categories', this.props.locale) });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <List containerStyle={{ marginBottom: 20 }}>
                        {
                            this.props.category.map((category, index) => (
                                <ListItem
                                    key={index}
                                    title={Languages.f(category.name, this.props.locale)}
                                    onPress={() => {
                                        InteractionManager.runAfterInteractions(() => {
                                            Actions.categoryChildView({ category });
                                        });
                                    }}
                                    leftIcon={{
                                        name: category.icon,
                                        type: category.iconType
                                    }} />
                            ))
                        }
                    </List>
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
