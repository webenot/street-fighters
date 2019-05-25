const apiHelper = require('../helpers/apiHelper');
const config = require('../config');

class FighterService {
    async getFighters() {
        try {
            const endpoint = config.get('api:fighters');
            return apiHelper(endpoint, 'GET');
        } catch (error) {
            throw error;
        }
    }

    async getFightersDetails(_id) {
        try {
            const endpoint = `${config.get('api:details')}${_id}.json`;
            return apiHelper(endpoint, 'GET');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new FighterService();