/* global navigator */

import { DeviceEventEmitter, Platform } from 'react-native';
import { Store, Geo, Actions } from '../global/globalIncludes';

let subscription = {};

function handleLocationUpdate(location) {
    Geo.Geocoder.geocodePosition({
        lng: location.coords.longitude,
        lat: location.coords.latitude
    }).then(response => {
        Store.appStore.dispatch(Actions.Settings.updateLocation({
            location: {
                lng: location.coords.longitude,
                lat: location.coords.latitude
            },
            name: response[0].feature || response[0].formattedAddress
        }));
    })
    .catch(error => {
        Store.appStore.dispatch(Actions.Utils.appError(error), 'CRITICAL');
    });
    subscription.remove();
}

function updateLocation() {
    if (Platform.OS === 'ios') {
        try {
            Geo.Location.requestWhenInUseAuthorization();
            Geo.Location.requestAlwaysAuthorization();
            Geo.Location.setDistanceFilter(5.0);
            Geo.Location.startUpdatingLocation();
            subscription = DeviceEventEmitter
            .addListener('locationUpdated', handleLocationUpdate);
        } catch (e) {
            console.log(e);
        }
    } else {
        navigator.geolocation.getCurrentPosition((location) => {
            Store.appStore.dispatch(Actions.Settings.updateLocation(location.coords));
            Geo.Geocoder.geocodePosition({
                lng: location.coords.longitude,
                lat: location.coords.latitude
            }).then(response => {
                Store.appStore.dispatch(Actions.Settings.updateGeocode(response[0]));
            })
            .catch(error => {
                Store.appStore.dispatch(Actions.Utils.appError(error), 'CRITICAL');
            });
        },
        (error) => {
            // TODO handle location error with popup
            Store.appStore.dispatch(Actions.Utils.appError(error), 'CRITICAL');
        }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
    }
}

module.exports = updateLocation;
