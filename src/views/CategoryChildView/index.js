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

import { Storage, Languages, Views, Colors } from '../../global/globalIncludes';

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
                    <View style={styles.list}>
                        {(() => {
                            return this.state.category.map((rowData, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            rowData % 2 ? styles.rightItem : styles.leftItem,
                                            styles.categoryItem,
                                            { backgroundColor: rowData.get('color') }
                                        ]}
                                        onPress={() => {
                                            InteractionManager.runAfterInteractions(() => {
                                                Actions.eventListView({ category: rowData });
                                            });
                                        }}>
                                        <Text style={styles.categoryItemText}>
                                            {Languages.f(rowData.get('name'), this.props.locale)}
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
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(CategoryChildView);
