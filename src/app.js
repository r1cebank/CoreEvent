import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-native-elements';

import styles from './resources/styles';
import { Actions, Store, Views, Scenes, Icons, Colors } from './global/globalIncludes';

class App extends Component {
    static propTypes = {
        style: View.propTypes.style,
        location: React.PropTypes.object,
        customer: React.PropTypes.object,
        loading: React.PropTypes.bool,
        locale: React.PropTypes.string,
        inDebug: React.PropTypes.bool,
        hydrationComplete: React.PropTypes.bool
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'hot'
        };
    }
    componentWillMount() {
        // Fetch data
        Store.appStore.dispatch(Actions.Data
                .fetchCarousel());
    }
    changeTab(selectedTab) {
        this.setState({
            selectedTab
        });
    }
    render() {
        const { selectedTab } = this.state;
        // if (this.props.loading) {
        //     return <Views.LoadingView loadingText="loading" />;
        // }
        return (
            // TODO: More complex scene config
            <View style={this.props.style}>
                {(() => {
                    if (this.props.inDebug) {
                        return null;
                    }
                    return null;
                })()}
                <Tabs hidesTabTouch>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'hot' && styles.tabNotSelected}
                        selected={selectedTab === 'hot'}
                        selectedTitleStyle={styles.titleSelected}
                        title="hot"
                        renderIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.grey}
                                    name="whatshot"
                                    size={26} />
                            );
                        }}
                        renderSelectedIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.primary}
                                    name="whatshot"
                                    size={26} />
                            );
                        }}
                        onPress={() => this.changeTab('hot')}>
                        <Scenes.HomeScene />
                    </Tab>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'cat' && styles.tabNotSelected}
                        selected={selectedTab === 'cat'}
                        selectedTitleStyle={styles.titleSelected}
                        title="category"
                        renderIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.grey}
                                    name="list"
                                    size={26} />
                            );
                        }}
                        renderSelectedIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.primary}
                                    name="list"
                                    size={26} />
                            );
                        }}
                        onPress={() => this.changeTab('cat')}>
                        <Views.EmptyView />
                    </Tab>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'profile' && styles.tabNotSelected}
                        selected={selectedTab === 'profile'}
                        selectedTitleStyle={styles.titleSelected}
                        title="profile"
                        renderIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.grey}
                                    name="person"
                                    size={26} />
                            );
                        }}
                        renderSelectedIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.primary}
                                    name="person"
                                    size={26} />
                            );
                        }}
                        onPress={() => this.changeTab('profile')}>
                        <Views.EmptyView />
                    </Tab>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'search' && styles.tabNotSelected}
                        selected={selectedTab === 'search'}
                        selectedTitleStyle={styles.titleSelected}
                        title="search"
                        renderIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.grey}
                                    name="search"
                                    size={26} />
                            );
                        }}
                        renderSelectedIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.primary}
                                    name="search"
                                    size={26} />
                            );
                        }}
                        onPress={() => this.changeTab('search')}>
                        <Views.EmptyView />
                    </Tab>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'settings' && styles.tabNotSelected}
                        selected={selectedTab === 'settings'}
                        selectedTitleStyle={styles.titleSelected}
                        title="settings"
                        renderIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.grey}
                                    name="settings"
                                    size={26} />
                            );
                        }}
                        renderSelectedIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.primary}
                                    name="settings"
                                    size={26} />
                            );
                        }}
                        onPress={() => this.changeTab('settings')}>
                        <Views.EmptyView />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale,
        inDebug: store.settings.inDebug,
        loading: store.utils.loading
    };
}

module.exports = connect(select)(App);
