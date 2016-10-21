import { API } from '../global/globalIncludes';

const carousel = {
    fetch: async () => {
        const query = new API.Parse.Query(API.Classes.carousel);
        return await query.find();
    }
};

module.exports = carousel;
