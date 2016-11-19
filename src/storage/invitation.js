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
    }
};

module.exports = invitation;
