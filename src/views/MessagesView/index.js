import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, ListView } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Storage, Colors, Views, Components } from '../../global/globalIncludes';

import styles from './resources/styles';

class MessagesView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loading: true,
            isRefreshing: false,
            invitations: [],
            messageDatasource: this.ds.cloneWithRows([])
        };
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('messageLC', this.props.locale) });
        await this.refreshMessages();
    }
    refreshMessages = async () => {
        this.setState({
            isRefreshing: true,
            loading: true
        });
        const invitations = await Storage.Invitation.fetchMine();
        for (const invitation of invitations) {
            invitation.event = await invitation.get('event').fetch();
        }
        this.setState({
            invitations,
            loading: false,
            isRefreshing: false,
            messageDatasource: this.ds.cloneWithRows(invitations)
        });
    }
    acceptInvitation = async (invitation, index) => {
        try {
            await Storage.Attendance.attend(invitation.event, Languages.t('attendanceMessage',
                this.props.locale));
            await Storage.Invitation.attend(invitation);
            // Remove the data entry
            const invitations = this.state.invitations.splice(0);
            invitations.splice(index, 1);
            this.setState({
                invitations,
                messageDatasource: this.ds.cloneWithRows(invitations)
            });
        } catch (e) {
            // TODO: Handle Error
        }
    }
    rejectInvitation = async (invitation, index) => {
        try {
            await Storage.Invitation.reject(invitation);
            // Remove the data entry
            const invitations = this.state.invitations.splice(0);
            invitations.splice(index, 1);
            this.setState({
                invitations,
                messageDatasource: this.ds.cloneWithRows(invitations)
            });
        } catch (e) {
            // TODO: Handle Error
        }
    }
    renderMessageRow = (rowData, sectionID, rowID) => {
        return (
            <Components.Message
                data={rowData}
                onPressAccept={() => this.acceptInvitation(rowData, rowID)}
                onPressReject={() => this.rejectInvitation(rowData, rowID)} />
        );
    }
    renderEmpty = () => {
        return (
            <Components.EmptyList
                hideButton={true}
                message={Languages.t('noMessages', this.props.locale)}
                />
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
                        onRefresh={this.refreshMessages}
                      />
                    }>
                    <View style={{ backgroundColor: Colors.infraRed, padding: 10 }}>
                        <Text style={{ color: Colors.frontColor }}>
                            {Languages.t('invitation', this.props.locale)}
                        </Text>
                    </View>
                    {(() => {
                        if (this.state.loading) {
                            return (
                                <View style={{ margin: 20 }}>
                                    <Views.LoadingView loadingText={Languages.t('loading', this.props.locale)} />
                                </View>
                            );
                        }
                        if (!this.state.messageDatasource.getRowCount()) {
                            return (
                                <View style={{ margin: 20 }}>
                                    {this.renderEmpty()}
                                </View>
                            );
                        }
                        return (
                            <ListView
                                style={styles.list}
                                keyboardShouldPersistTaps={true}
                                enableEmptySections={true}
                                dataSource={this.state.messageDatasource}
                                renderRow={this.renderMessageRow} />
                        );
                    })()}
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
