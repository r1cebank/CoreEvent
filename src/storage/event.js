import { API } from '../global/globalIncludes';

const event = {
    fetchById: async (id) => {
        const query = new API.Parse.Query(API.Classes.event);
        return await query.get(id);
    },
    fetchByCategory: async (id) => {
        const parentCategory = new API.Classes.category();
        parentCategory.id = id;
        const query = new API.Parse.Query(API.Classes.event).equalTo('categories', parentCategory);
        query.limit(20);
        return await query.find();
    }
};

module.exports = event;
