const config = require('../config');
const API_URL = config.get('api:urlBase');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;

function* createFileFetcher(url, options) {
    const response = yield fetch(url, options);
    const responseData = yield response.ok ? response.json() : Promise.reject(Error('Failed to load'));
    if (responseData.content) {
        return yield JSON.parse(atob(responseData.content));
    }
    return yield responseData;
}

function callApi(endpoind, method) {
    const url = API_URL + endpoind;
    const options = {
        method
    };
    const fileFetcher = createFileFetcher(url, options);
    const handle = result => result.done
        ? Promise.resolve(result.value)
        : Promise.resolve(result.value).then(res => handle(fileFetcher.next(res)));

    return handle(fileFetcher.next())
        .then(res => res)
        .catch(error => { throw error });
}

module.exports = callApi;