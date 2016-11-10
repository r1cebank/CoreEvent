import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { SearchBar, Button } from 'react-native-elements';

import { Languages, Colors, Storage } from '../../global/globalIncludes';

import styles from './resources/styles';

class AddressSelectorView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        state: React.PropTypes.object,
        city: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            searchVal: `${props.state.n}${props.city.n}`
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('interests', this.props.locale) });
        const category = await Storage.Category.fetchNonRoot();
        this.setState({ category });
    }
    isSelected = (item) => {
        const exists = this.state.selectedItems.filter((selected) => {
            return (selected.id === item.id);
        });
        return !!exists.length;
    }
    toggleSelection = (item) => {
        const exists = this.state.selectedItems.filter((selected) => {
            return (selected.id === item.id);
        });
        let selectedItems = this.state.selectedItems.slice(0);
        if (exists.length) {
            selectedItems = selectedItems.filter((obj) => {
                return obj.id !== item.id;
            });
        } else {
            selectedItems.push(item);
        }
        this.setState({
            selectedItems
        });
        return selectedItems;
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
                    onChangeText={() => {}}
                    placeholder={Languages.t('search', this.props.locale)} />
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <View style={styles.list}>
                    </View>
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
