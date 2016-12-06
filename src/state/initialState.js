export const InitialAppState = {
    settings: {
        locale: 'zh-CN',
        env: 'staging',
        searchRadius: 10,
        selectedTab: 'aroundme',
        inDebug: false
    },
    data: {
        pushMessages: [],
        drafts: {},
        favorites: [],
        hidden: []
    },
    utils: {
        errors: [],
        loading: true,
        toggleMenu: false,
        hydrationComplete: false
    }
};
