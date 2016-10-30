import DeviceInfo from 'react-native-device-info';
import { API } from '../global/globalIncludes';

const user = {
    signup: async (username, password) => {
        const parseUser = new API.Parse.User();
        parseUser.set('username', username);
        parseUser.set('password', password);
        parseUser.set('level', 0);
        parseUser.set('vip', false);
        return new Promise((resolve, reject) => {
            parseUser.signUp(null, {
                success: (registeredUser) => {
                    resolve(registeredUser);
                },
                error: (_, error) => {
                    reject(error);
                }
            });
        });
    },
    login: async (username, password) => {
        return new Promise((resolve, reject) => {
            API.Parse.User.logIn(username, password, {
                success: (registeredUser) => {
                    resolve(registeredUser);
                },
                error: (_, error) => {
                    reject(error);
                }
            });
        });
    },
    logout: async () => {
        return await API.Parse.User.logOut();
    },
    userExists: async (username) => {
        const query = new API.Parse.Query(API.Parse.User);
        query.equalTo('username', username);
        return await query.find();
    },
    updatePushToken: async (token) => {
        const installationController = API.Parse.CoreManager.getInstallationController();
        const installationId = await installationController.currentInstallationId();
        const installation = new API.Parse.Installation({
            installationId,
            deviceType: token.os,
            deviceToken: token.token,
            deviceName: DeviceInfo.getDeviceName(),
            deviceLocale: DeviceInfo.getDeviceLocale(),
            deviceCountry: DeviceInfo.getDeviceCountry(),
            deviceBrand: DeviceInfo.getBrand(),
            deviceModel: DeviceInfo.getModel(),
            buildNumber: DeviceInfo.getBuildNumber(),
            appVersion: DeviceInfo.getVersion(),
            channels: ['general']
        });
        return installation.save();
    }
};

module.exports = user;
