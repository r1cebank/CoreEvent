import { API } from '../global/globalIncludes';

const invitation = {
    invite: async (user, event, message) => {
        const draft = new API.Classes.invitation();
        draft.set('user', user);
        draft.set('event', event);
        draft.set('accepted', false);
        draft.set('message', message);
        const ACL = new API.Parse.ACL();
        ACL.setReadAccess(API.Parse.User.current(), true);
        ACL.setWriteAccess(API.Parse.User.current(), true);
        ACL.setReadAccess(user, true);
        ACL.setWriteAccess(user, true);
        draft.setACL(ACL);
        return await draft.save();
    },
    fetchMine: async () => {
        const query = new API.Parse.Query(API.Classes.invitation).equalTo('user',
        API.Parse.User.current());
        query.limit(20);
        query.ascending('createdAt');
        return await query.find();
    }
};

module.exports = invitation;
