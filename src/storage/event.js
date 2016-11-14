import { API } from '../global/globalIncludes';

const event = {
    fetchById: async (id) => {
        const query = new API.Parse.Query(API.Classes.event);
        return await query.get(id);
    },
    fetchByCategory: async (id) => {
        const parentCategory = new API.Classes.category();
        parentCategory.id = id;
        const query = new API.Parse.Query(API.Classes.event).equalTo('categories', parentCategory);
        query.limit(20);
        return await query.find();
    },
    fetchByLocation: async (location, radius = 10) => {
        const query = new API.Parse.Query(API.Classes.event);
        const userlocation = new API.Parse.GeoPoint({
            latitude: location.lat,
            longitude: location.lng
        });
        query.withinKilometers('coords', userlocation, radius);
        query.limit(20);
        return await query.find();
    },
    fetchByLocationSubscription: (location, radius = 10) => {
        const query = new API.Parse.Query(API.Classes.event);
        const userlocation = new API.Parse.GeoPoint({
            latitude: location.lat,
            longitude: location.lng
        });
        query.withinKilometers('coords', userlocation, radius);
        query.limit(20);
        return query.subscribe();
    },
    create: async (eventData) => {
        const draft = new API.Classes.event();
        draft.set('name', eventData.name);
        draft.set('description', eventData.description);
        draft.set('description', eventData.description);
        const relation = draft.relation('categories');
        relation.add(eventData.interests);
        draft.set('start', eventData.date);
        const coords = new API.Parse.GeoPoint({
            latitude: eventData.address.location.lat,
            longitude: eventData.address.location.lng
        });
        draft.set('coords', coords);
        draft.set('location', {
            name: eventData.detailedAddress,
            address: eventData.address.name,
            coords: eventData.address.location
        });
        draft.set('owner', API.Parse.User.current());
        const ACL = new API.Parse.ACL(API.Parse.User.current());
        ACL.setPublicReadAccess(true);
        draft.setACL(ACL);
        return await draft.save();
    }
};

module.exports = event;
