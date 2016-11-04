import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView, InteractionManager } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';

import { Languages, Colors } from '../../global/globalIncludes';

import styles from './resources/styles';

class CategorySelectorView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        onCitySelect: React.PropTypes.func
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('interests', this.props.locale) });
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    round
                    lightTheme
                    inputStyle={{ backgroundColor: Colors.frontColor }}
                    containerStyle={{ alignSelf: 'stretch', backgroundColor: Colors.silverSand}}
                    onChangeText={() => {}}
                    placeholder={Languages.t('search', this.props.locale)} />
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
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
