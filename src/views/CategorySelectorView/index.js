import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView , Text } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { SearchBar, Button } from 'react-native-elements';

import { Languages, Colors, Storage } from '../../global/globalIncludes';

import styles from './resources/styles';

class CategorySelectorView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        onInterestSelect: React.PropTypes.func,
        selectedInterest: React.PropTypes.array
    }
    constructor(props) {
        super(props);
        if (this.props.selectedInterest.length) {
            this.state = {
                category: [],
                selectedItems: this.props.selectedInterest
            };
        } else {
            this.state = {
                category: [],
                selectedItems: []
            };
        }
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
                        {(() => {
                            return this.state.category.map((categoryItem, index) => {
                                const selected = this.isSelected(categoryItem);
                                return (
                                    <Button
                                        key={index}
                                        onPress={() => {
                                            this.props
                                            .onInterestSelect(this.toggleSelection(categoryItem));
                                        }}
                                        fontSize={15}
                                        icon={{ name: selected ? 'check' : 'add' }}
                                        backgroundColor={selected ? Colors.green : Colors.infraRed}
                                        buttonStyle={{margin: 5, marginLeft: 5, marginRight: 5, paddingLeft: 15, paddingRight: 15, padding: 5}}
                                        title={Languages.f(categoryItem.get('name'), this.props.locale)} />
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
        locale: store.settings.locale
    };
}

module.exports = connect(select)(CategorySelectorView);
