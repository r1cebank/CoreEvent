import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    InteractionManager
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import {
    Languages,
    Components,
    Colors,
    Storage
} from '../../global/globalIncludes';
import styles from './resources/styles';

class CategoryView extends Component {
    static propTypes = {
        category: React.PropTypes.array,
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            searchVal: '',
            searchCategory: []
        };
    }
    componentWillMount() {
        Actions.refresh({ title: Languages.t('interestsLC', this.props.locale) });
    }
    searchCategory = async (searchVal) => {
        this.setState({ searchVal });
        if (searchVal.length > 1) {
            const searchCategory = await Storage.Category.fetchByName(searchVal);
            this.setState({
                searchCategory: JSON.parse(JSON.stringify(searchCategory))
            });
        }
    }
    renderList = () => {
        let category = this.props.category;
        if (this.state.searchVal.length > 1) {
            category = this.state.searchCategory;
        }
        return category.map((rowData, index) => {
            return (
                <Components.CategoryTile
                    key={index}
                    index={index}
                    onPress={() => {
                        InteractionManager.runAfterInteractions(() => {
                            if (rowData.root) {
                                Actions.categoryChildView({ category: rowData });
                            } else {
                                Actions.eventListView({ category: rowData });
                            }
                        });
                    }}
                    color={rowData.color}
                    name={Languages.f(rowData.name, this.props.locale)} />
            );
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    round
                    lightTheme
                    value={this.state.searchVal}
                    inputStyle={{ backgroundColor: Colors.frontColor }}
                    containerStyle={{ alignSelf: 'stretch', backgroundColor: Colors.silverSand }}
                    onChangeText={this.searchCategory}
                    placeholder={Languages.t('search', this.props.locale)} />
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <View style={styles.list}>
                        {this.renderList()}
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
