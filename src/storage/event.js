import { API } from '../global/globalIncludes';

const event = {
    fetchById: async (id) => {
        const query = new API.Parse.Query(API.Classes.event);
        return await query.get(id);
    }
};

module.exports = event;
