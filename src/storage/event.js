import { API } from '../global/globalIncludes';

const event = {
    delete: async (eventObj) => {
        return eventObj.destroy();
    },
    fetchById: async (id) => {
        const query = new API.Parse.Query(API.Classes.event);
        return await query.get(id);
    },
    fetchByCategory: async (id) => {
        const parentCategory = new API.Classes.category();
        parentCategory.id = id;
        const query = new API.Parse.Query(API.Classes.event).equalTo('categories', parentCategory);
        query.ascending('start');
        query.greaterThan('start', new Date());
        query.limit(20);
        return await query.find();
    },
    fetchMyEvents: async () => {
        const query = new API.Parse.Query(API.Classes.event).equalTo('owner',
        API.Parse.User.current());
        query.ascending('start');
        query.limit(20);
        return await query.find();
    },
    fetchByLocation: async (location, radius = 10, skip = 0) => {
        const query = new API.Parse.Query(API.Classes.event);
        const userlocation = new API.Parse.GeoPoint({
            latitude: location.lat,
            longitude: location.lng
        });
        // Omit my events
        query.notEqualTo('owner', API.Parse.User.current());
        query.withinKilometers('coords', userlocation, radius);
        query.ascending('start');
        query.greaterThan('start', new Date());
        query.limit(20);
        query.skip(skip);
        return await query.find();
    },
    countRemaining: async (location, radius = 10, skip = 0) => {
        const query = new API.Parse.Query(API.Classes.event);
        const userlocation = new API.Parse.GeoPoint({
            latitude: location.lat,
            longitude: location.lng
        });
        // Omit my events
        query.notEqualTo('owner', API.Parse.User.current());
        query.withinKilometers('coords', userlocation, radius);
        query.ascending('start');
        query.greaterThan('start', new Date());
        query.limit(20);
        query.skip(skip);
        return await query.count();
    },
    fetchByLocationSubscription: (location, radius = 10) => {
        const query = new API.Parse.Query(API.Classes.event);
        const userlocation = new API.Parse.GeoPoint({
            latitude: location.lat,
            longitude: location.lng
        });
        // Omit my events
        query.notEqualTo('owner', API.Parse.User.current());
        query.withinKilometers('coords', userlocation, radius);
        query.ascending('start');
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
        draft.set('cancelMessage', eventData.cancelMessage);
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
