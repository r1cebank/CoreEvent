import { API } from '../global/globalIncludes';

const attendance = {
    fetchAttendee: async (eventId) => {
        const event = new API.Classes.event();
        event.id = eventId;
        const query = new API.Parse.Query(API.Classes.attendance).equalTo('event', event);
        return await query.find();
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
