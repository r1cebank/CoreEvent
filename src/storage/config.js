import { API } from '../global/globalIncludes';

const config = {
    fetch: async () => {
        return await API.Parse.Config.get();
    }
};

module.exports = config;
