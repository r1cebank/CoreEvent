import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

import { Storage, Languages, Views } from '../../global/globalIncludes';

import styles from './resources/styles';

class CategoryChildView extends Component {
    static propTypes = {
        category: React.PropTypes.object,
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = { category: [] };
    }
    async componentWillMount() {
        Actions.refresh({ title: Languages.f(this.props.category.name, this.props.locale) });
        const category = await Storage.Category.fetchChild(this.props.category.objectId);
        this.setState({ category });
    }
    render() {
        if (!this.state.category.length) {
            return <Views.LoadingView loadingText="Loading" />;
        }
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
                                <List containerStyle={styles.listContainer}>
                                    {
                                        this.state.category.map((category, index) => (
                                            <ListItem
                                                key={index}
                                                wrapperStyle={styles.wrapper}
                                                title={Languages.f(category.get('name'),
                                                    this.props.locale)}
                                                onPress={() => {
                                                    InteractionManager.runAfterInteractions(() => {
                                                        Actions.eventListView({ category });
                                                    });
                                                }}
                                                titleStyle={styles.titleStyle}
                                                leftIcon={{
                                                    name: category.get('icon'),
                                                    type: category.get('iconType'),
                                                    style: styles.iconStyle
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
