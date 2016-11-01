import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

import { Languages, Colors, Actions } from '../../global/globalIncludes';

import styles from './resources/styles';

class LanguagesView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        changeLocale: React.PropTypes.func
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('language', this.props.locale) });
    }
    render() {
        return (
            <View style={styles.container}>
                <List containerStyle={styles.listContainer}>
                    <ListItem
                        wrapperStyle={{ padding: 5 }}
                        title="简体中文"
                        chevronColor={Colors.infraRed}
                        onPress={() => {
                            this.props.changeLocale('zh-CN');
                            RouterActions.pop();
                        }}
                        titleStyle={styles.titleStyle}
                    />
                    <ListItem
                        wrapperStyle={{ padding: 5 }}
                        title="English"
                        chevronColor={Colors.infraRed}
                        onPress={() => {
                            this.props.changeLocale('en-US');
                            RouterActions.pop();
                        }}
                        titleStyle={styles.titleStyle}
                    />
                    <ListItem
                        wrapperStyle={{ padding: 5 }}
                        title="日本語"
                        chevronColor={Colors.infraRed}
                        onPress={() => {
                            this.props.changeLocale('ja-JP');
                            RouterActions.pop();
                        }}
                        titleStyle={styles.titleStyle}
                    />
                </List>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

function actions(dispatch) {
    return {
        changeLocale: (locale) => dispatch(Actions.Settings.setLanguage(locale))
    };
}

module.exports = connect(select, actions)(LanguagesView);
