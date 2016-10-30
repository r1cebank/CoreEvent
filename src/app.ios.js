import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-native-elements';

import styles from './resources/styles';
import {
    Actions,
    Store,
    Views,
    Scenes,
    Icons,
    API,
    Colors,
    Languages,
    Storage
} from './global/globalIncludes';

class App extends Component {
    static propTypes = {
        style: View.propTypes.style,
        location: React.PropTypes.object,
        customer: React.PropTypes.object,
        user: React.PropTypes.object,
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
    async componentWillMount() {
        // Fetch data
        // Store.appStore.dispatch(Actions.Settings
        //         .fetchConfig());
        const carousel = await Storage.Carousel.fetch();
        const category = await Storage.Category.fetchRoot();
        const config = await Storage.Config.fetch();
        // Fetch new user config
        Store.appStore.dispatch(Actions.Data
                .updateCarousel(carousel));
        Store.appStore.dispatch(Actions.Data
                .updateCategory(category));
        Store.appStore.dispatch(Actions.Settings
                .updateConfig(config));
        Store.appStore.dispatch(Actions.Settings
            .fetchUserUpdate());
    }
    changeTab(selectedTab) {
        this.setState({
            selectedTab
        });
    }
    render() {
        const { selectedTab } = this.state;
        if (!this.props.hydrationComplete) {
            return null;
        }
        if (!this.props.user) {
            return <Scenes.LoginScene />;
        }
        return (
            // TODO: More complex scene config
            <View style={this.props.style}>
                {(() => {
                    if (this.props.inDebug) {
                        return null;
                    }
                    return null;
                })()}
                <Tabs
                    hidesTabTouch
                    tabBarStyle={styles.tabBarStyle}>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'hot' && styles.tabNotSelected}
                        selected={selectedTab === 'hot'}
                        selectedTitleStyle={styles.titleSelected}
                        title={Languages.t('hot', this.props.locale)}
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
                        title={Languages.t('category', this.props.locale)}
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
                        <Scenes.CategoryScene />
                    </Tab>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'profile' && styles.tabNotSelected}
                        selected={selectedTab === 'profile'}
                        selectedTitleStyle={styles.titleSelected}
                        title={Languages.t('profile', this.props.locale)}
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
                        <Scenes.ProfileScene />
                    </Tab>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'messages' && styles.tabNotSelected}
                        selected={selectedTab === 'messages'}
                        selectedTitleStyle={styles.titleSelected}
                        title={Languages.t('message', this.props.locale)}
                        renderIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.grey}
                                    name="chat"
                                    size={26} />
                            );
                        }}
                        renderSelectedIcon={() => {
                            return (
                                <Icons.MaterialIcons
                                    color={Colors.primary}
                                    name="chat"
                                    size={26} />
                            );
                        }}
                        onPress={() => this.changeTab('messages')}>
                        <Views.EmptyView />
                    </Tab>
                    <Tab
                        titleStyle={styles.titleStyle}
                        tabStyle={selectedTab !== 'settings' && styles.tabNotSelected}
                        selected={selectedTab === 'settings'}
                        selectedTitleStyle={styles.titleSelected}
                        title={Languages.t('settings', this.props.locale)}
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
                        <Scenes.SettingsScene />
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
        user: store.settings.user,
        loading: store.utils.loading,
        hydrationComplete: store.utils.hydrationComplete
    };
}

module.exports = connect(select)(App);
