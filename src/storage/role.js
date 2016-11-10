import { API } from '../global/globalIncludes';

const role = {
    find: async (name) => {
        const query = new API.Parse.Query(API.Classes.rolw).equalTo('name', name);
        return await query.find();
    }
};

module.exports = role;
