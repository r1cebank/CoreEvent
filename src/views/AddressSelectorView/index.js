import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { View, ScrollView, ListView } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { SearchBar, Button } from 'react-native-elements';

import { Languages, Colors, Storage, Utils } from '../../global/globalIncludes';

import styles from './resources/styles';

class AddressSelectorView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        state: React.PropTypes.object,
        onSelect: React.PropTypes.func,
        city: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            searchVal: '',
            suggestion: [],
            dataSource: this.ds.cloneWithRows([])
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('searchAddress', this.props.locale) });
        const category = await Storage.Category.fetchNonRoot();
        this.setState({ category });
    }
    getSuggestions = async (searchVal) => {
        this.setState({ searchVal });
        const suggestions = await Utils.placeSuggestions(searchVal);
        this.setState({ dataSource: this.ds.cloneWithRows(suggestions.result) });
    }
    renderRow = (data) => {
        return (
            <ListItem
                hideChevron={true}
                onPress={() => {
                    RouterActions.pop();
                    this.props.onSelect(data);
                }}
                wrapperStyle={{ padding: 10 }}
                title={data.name}
            />
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    round
                    lightTheme
                    autoFocus
                    value={this.state.searchVal}
                    inputStyle={{ backgroundColor: Colors.frontColor }}
                    containerStyle={{ alignSelf: 'stretch', backgroundColor: Colors.silverSand }}
                    onChangeText={this.getSuggestions}
                    placeholder={Languages.t('search', this.props.locale)} />
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={true}
                    style={styles.scrollView}>
                    <ListView
                        style={styles.list}
                        keyboardShouldPersistTaps={true}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow} />
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

module.exports = connect(select)(AddressSelectorView);
