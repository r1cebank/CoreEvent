import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text, ScrollView, RefreshControl, ListView } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Storage } from '../../global/globalIncludes';

import styles from './resources/styles';

class MessagesView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            isRefreshing: false,
            messageDatasource: this.ds.cloneWithRows([])
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('messageLC', this.props.locale) });
        await this.refreshMessages();
    }
    refreshMessages = async () => {
        const invitations = await Storage.Invitation.fetchMine();
        for (const invitation of invitations) {
            invitation.event = await invitation.get('event').fetch();
        }
        this.setState({
            messageDatasource: this.ds.cloneWithRows(invitations)
        });
    }
    renderMessageRow = (rowData) => {
        return (
            <ListItem title={rowData.event.get('name')} />
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                      />
                    }>
                    <ListView
                        style={styles.list}
                        keyboardShouldPersistTaps={true}
                        enableEmptySections={true}
                        dataSource={this.state.messageDatasource}
                        renderRow={this.renderMessageRow} />
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

module.exports = connect(select)(MessagesView);
