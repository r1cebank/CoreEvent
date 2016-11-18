import { API } from '../global/globalIncludes';

const attendance = {
    fetchAttendee: async (eventId) => {
        const event = new API.Classes.event();
        event.id = eventId;
        const query = new API.Parse.Query(API.Classes.attendance).equalTo('event', event);
        return await query.find();
    }
};

module.exports = attendance;
