import I18n from 'react-native-i18n';

export const InitialAppState = {
    settings: {
        locale: I18n.locale,
        env: 'staging',
        selectedTab: 'aroundme',
        inDebug: false
    },
    data: {
        pushMessages: [],
        drafts: {}
    },
    utils: {
        errors: [],
        loading: true,
        toggleMenu: false,
        hydrationComplete: false
    }
};
