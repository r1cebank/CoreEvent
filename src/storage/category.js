import { API } from '../global/globalIncludes';

const category = {
    fetchRoot: async () => {
        const query = new API.Parse.Query(API.Classes.category).equalTo('root', true);
        return await query.find();
    },
    fetchNonRoot: async () => {
        const query = new API.Parse.Query(API.Classes.category).equalTo('root', false);
        return await query.find();
    },
    fetchChild: async (parent) => {
        const parentCategory = new API.Classes.category();
        parentCategory.id = parent;
        const query = new API.Parse.Query(API.Classes.category).equalTo('parent', parentCategory);
        return await query.find();
    },
    fetchByName: async (searchVal) => {
        const query = new API.Parse.Query(API.Classes.category);
        query.equalTo('root', false);
        query.contains('search', searchVal);
        return await query.find();
    }
};

module.exports = category;
