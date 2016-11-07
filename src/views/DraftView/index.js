import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem } from 'react-native-elements';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Colors, Components } from '../../global/globalIncludes';

import styles from './resources/styles';

class DraftView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        drafts: React.PropTypes.object
    }
    componentWillMount() {
        RouterActions.refresh({
            title: Languages.t('myDraft', this.props.locale),
            rightTitle: Languages.t('removeAllDraft', this.props.locale),
            onRight: () => {}
        });
    }
    getSubtitle = (data) => {
        if (data.interests.length) {
            return data.interests.map((interest) => {
                return Languages.f(interest.name, this.props.locale);
            }).join(' ');
        }
        return undefined;
    }
    renderRow = (data) => {
        return (
            <ListItem
                hideChevron={true}
                wrapperStyle={{ padding: 10 }}
                title={data.name}
                subtitle={this.getSubtitle(data)}
                titleStyle={styles.titleStyle}
            />
        );
    }
    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (
            <View style={styles.container}>
                <SwipeListView
                    dataSource={ds.cloneWithRows(this.props.drafts)}
                    disableRightSwipe={true}
                    previewFirstRow={true}
                    previewDuration={200}
                    renderRow={this.renderRow}
                    renderHiddenRow={data => (
                        <View style={styles.hiddenRow}>
                            <TouchableOpacity style={styles.deleteButton}>
                                <Text style={{ color: 'white' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale,
        drafts: store.data.drafts
    };
}

module.exports = connect(select)(DraftView);
