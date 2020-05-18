import jQuery from 'jquery';
import config from '../core/config';

class LoginService {
    constructor() {
    }

    login(data) {
        const url = `${config.API_PREFIX}/auth/login`;

        return jQuery.post(url, data, callback);
    }
}

export default new LoginService();
