import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

import { Storage, Components } from '../../global/globalIncludes';

import styles from './resources/styles';

class CategoryChildView extends Component {
    constructor(props) {
        super(props);
        this.state = { category: [] };
    }
    async componentWillMount() {
        Actions.refresh({ title: this.props.category.name[this.props.locale] });
        const category = await Storage.Category.fetchChild(this.props.category.objectId);
        this.setState({category});
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    {(() => {
                        if (this.state.category.length) {
                            return (
                                <List containerStyle={{marginBottom: 20}}>
                                    {
                                        this.state.category.map((category, index) => (
                                            <ListItem
                                                key={index}
                                                title={category.get('name')[this.props.locale]}
                                                leftIcon={{
                                                    name: category.get('icon'),
                                                    type: category.get('iconType')
                                                }} />
                                        ))
                                    }
                                </List>
                            );
                        }
                        return null;
                    })()}
                </ScrollView>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(CategoryChildView);
