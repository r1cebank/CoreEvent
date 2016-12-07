import { API } from '../global/globalIncludes';

const report = {
    create: async (event) => {
        const draft = new API.Classes.report();
        draft.set('reportedBy', API.Parse.User.current());
        draft.set('event', event);
        draft.set('verified', false);
        draft.setACL(new API.Parse.ACL({}));
        return await draft.save();
    }
};

module.exports = report;
