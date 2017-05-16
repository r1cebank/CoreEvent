export const InitialAppState = {
    settings: {
        locale: 'zh-CN',
        env: 'staging',
        searchRadius: 10,
        selectedTab: 'aroundme',
        inDebug: false,
        defaultLocation: {
            location: {
                lat: 45.749997,
                lng: 126.6333308
            },
            name: '哈尔滨'
        }
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
