import { API } from '../global/globalIncludes';

const location = {
    fetchById: async (id) => {
        const query = new API.Parse.Query(API.Classes.location);
        return await query.get(id);
    }
};

module.exports = location;
