import { API } from '../global/globalIncludes';

const attendance = {
    fetchAttendee: async (eventId) => {
        const event = new API.Classes.event();
        event.id = eventId;
        const query = new API.Parse.Query(API.Classes.attendance).equalTo('event', event);
        return await query.find();
    },
    fetchMine: async () => {
        const query = new API.Parse.Query(API.Classes.attendance).equalTo('user',
        API.Parse.User.current());
        query.limit(20);
        return await query.find();
    },
    fetchMineSubscription: () => {
        const query = new API.Parse.Query(API.Classes.attendance).equalTo('user',
        API.Parse.User.current());
        query.limit(20);
        return query.subscribe();
    },
    leave: async (event) => {
        const query = new API.Parse.Query(API.Classes.attendance);
        query.equalTo('user', API.Parse.User.current());
        query.equalTo('event', event);
        const attendanceObject = await query.first();
        return await attendanceObject.destroy();
    },
    attend: async (event, message) => {
        const draft = new API.Classes.attendance();
        draft.set('user', API.Parse.User.current());
        draft.set('event', event);
        draft.set('message', message);
        const ACL = new API.Parse.ACL();
        ACL.setReadAccess(API.Parse.User.current(), true);
        ACL.setWriteAccess(API.Parse.User.current(), true);
        ACL.setReadAccess(event.get('owner'), true);
        draft.setACL(ACL);
        return await draft.save();
    }
};

module.exports = attendance;
