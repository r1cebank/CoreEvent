import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    InteractionManager
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Storage, Languages, Views, Components } from '../../global/globalIncludes';

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
        this.setState({
            category: JSON.parse(JSON.stringify(category))
        });
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
                    <View style={styles.list}>
                        {(() => {
                            return this.state.category.map((rowData, index) => {
                                return (
                                    <Components.CategoryTile
                                        key={index}
                                        index={index}
                                        onPress={() => {
                                            InteractionManager.runAfterInteractions(() => {
                                                Actions.eventListView({ category: rowData });
                                            });
                                        }}
                                        color={rowData.color}
                                        name={Languages
                                            .f(rowData.name, this.props.locale)} />
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
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(CategoryChildView);
