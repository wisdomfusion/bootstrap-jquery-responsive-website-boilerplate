import http from '../core/http';
import storage from '../core/storage';

class LoginService {
    constructor() {
    }

    login(data, success = () => {}, error = () => {}) {
        const url = '/auth/login';
        return http.post(url, data, success, error);
    }

    loginOut(success = () => {}) {
        storage.removeCookie('user_info');
        storage.removeCookie('token');

        if (typeof success === 'function') {
            success();
        }
    }
}

export default new LoginService();
