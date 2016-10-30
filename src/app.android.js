import { View } from 'react-native';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import { ListItem } from 'react-native-elements';
import { Actions as RouterActions } from 'react-native-router-flux';

import styles from './resources/styles';
import {
    Actions,
    Store,
    Views,
    Scenes,
    Icons,
    Colors,
    Languages,
    Storage
} from './global/globalIncludes';

const list = [
    {
        title: 'hot',
        icon: 'whatshot'
    },
    {
        title: 'category',
        icon: 'list'
    },
    {
        title: 'profile',
        icon: 'person'
    },
    {
        title: 'message',
        icon: 'chat'
    },
    {
        title: 'settings',
        icon: 'settings'
    }
];

const scenes = {
    hot: Scenes.HomeScene,
    category: Scenes.CategoryScene,
    profile: Scenes.ProfileScene,
    message: Views.EmptyView,
    settings: Scenes.SettingsScene
};

class App extends Component {
    static propTypes = {
        style: View.propTypes.style,
        location: React.PropTypes.object,
        customer: React.PropTypes.object,
        loading: React.PropTypes.bool,
        toggleMenu: React.PropTypes.bool,
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
        Store.appStore.dispatch(Actions.Data
                .updateCarousel(carousel));
        Store.appStore.dispatch(Actions.Data
                .updateCategory(category));
        Store.appStore.dispatch(Actions.Settings
                .updateConfig(config));
        Store.appStore.dispatch(Actions.Settings
            .fetchUserUpdate());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.toggleMenu !== this.props.toggleMenu) {
            this.drawer.open();
        }
    }
    changeTab(selectedTab) {
        this.setState({
            selectedTab
        });
        this.drawer.close();
    }
    render() {
        const loggedIn = false;
        const { selectedTab } = this.state;
        const CurrentView = scenes[selectedTab];
        if (!this.props.hydrationComplete) {
            return null;
        }
        if (!loggedIn) {
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
                <Drawer
                    styles={{ shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 }}
                    openDrawerOffset={100}
                    panOpenMask={0.1}
                    tapToClose={true}
                    tweenHandler={Drawer.tweenPresets.parallax}
                    ref={(ref) => this.drawer = ref}
                    content={
                        <View style={{ marginBottom: 20 }}>
                        {
                            list.map((item, i) => (
                                <ListItem
                                    leftIcon={{
                                        name: item.icon,
                                        color: (selectedTab === item.title) ?
                                            Colors.primary : Colors.grey
                                    }}
                                    wrapperStyle={{ padding: 20 }}
                                    hideChevron={true}
                                    titleStyle={{
                                        color: (selectedTab === item.title) ?
                                            Colors.primary : Colors.grey
                                    }}
                                    onPress={() => this.changeTab(item.title)}
                                    key={i}
                                    title={Languages.t(item.title, this.props.locale)} />
                            ))
                        }
                        </View>
                    }>
                    <CurrentView />
                </Drawer>
                <ActionButton buttonColor="rgba(231,76,60,1)" position="left">
                    <ActionButton.Item
                        buttonColor="#9b59b6"
                        title="New Event"
                        onPress={() => {}}>
                        <Icons.MaterialIcons name="add" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Scan QR code"
                        onPress={RouterActions.qrScanner}>
                        <Icons.MaterialIcons
                            name="crop-free"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#1abc9c"
                        title="All Tasks"
                        onPress={() => {}}>
                        <Icons.Ionicons
                            name="md-done-all"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale,
        inDebug: store.settings.inDebug,
        loading: store.utils.loading,
        toggleMenu: store.utils.toggleMenu,
        hydrationComplete: store.utils.hydrationComplete
    };
}

module.exports = connect(select)(App);
