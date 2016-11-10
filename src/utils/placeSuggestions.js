/* global fetch */
import { API, Store, Actions } from '../global/globalIncludes';
import Env from '../env';

async function placeSuggestions(query, locale = 'cn') {
    // Currently only support cn locale
    if (locale === 'cn') {
        try {
            const requestUrl = API.BaiduPlaces
                .replace('{input}', query).replace('{apiKey}', Env.BAIDU_APIKEY);
            const response = await fetch(requestUrl);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            Store.appStore.dispatch(Actions.appError(error));
            return {};
        }
    }
    return {};
}

module.exports = placeSuggestions;
