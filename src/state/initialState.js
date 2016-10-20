import I18n from 'react-native-i18n';

export const InitialAppState = {
    settings: {
        locale: I18n.locale,
        env: 'staging',
        inDebug: false
    },
    utils: {
        errors: []
    }
};
