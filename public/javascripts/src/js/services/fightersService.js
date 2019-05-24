import {apiHelper} from '../helpers/apiHelper';

class FighterService {
    async getFighters() {
        try {
            const endpoint = 'fighters.json';
            return apiHelper(endpoint, 'GET');
        } catch (error) {
            throw error;
        }
    }

    async getFightersDetails(_id) {
        try {
            const endpoint = `details/fighter/${_id}.json`;
            return apiHelper(endpoint, 'GET');
        } catch (error) {
            throw error;
        }
    }
}

export const fighterService = new FighterService();