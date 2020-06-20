import Cookies from 'js-cookie';

class Storage {
    constructor() {
    }

    /**
     * 获取 localStorage 中 key 的值
     * @param key
     * @returns {any}
     */
    get(key) {
        const value = localStorage.getItem(key);
        return !!value ? JSON.parse(value) : undefined;
    }

    /**
     * 把 key/value 存入 localStorage
     * @param key
     * @param value
     */
    set(key, value) {
        localStorage.setItem(key, value === '' ? '' : JSON.stringify(value));
    }

    /**
     * 获取 sessionStorage 中 key 的值
     * @param key
     * @returns {any}
     */
    getFromSession(key) {
        const value = sessionStorage.getItem(key);
        return !!value ? JSON.parse(value) : '';
    }

    /**
     * 把 key/value 存入 localStorage
     * @param key
     * @param value
     */
    setToSession(key, value) {
        localStorage.setItem(key, value === '' ? '' : JSON.stringify(value));
    }

    /**
     * 获取 cookie 中 key 的值
     * @param key
     * @returns {any}
     */
    getCookie(key) {
        const value = Cookies.get(key);
        return !!value ? JSON.parse(value) : undefined;
    }

    /**
     * 把 key/value 存入 cookie
     * @param key
     * @param value
     * @param expires
     * @param path
     */
    setCookie(key, value, expires = 30, path = '/') {
        Cookies.set(key, value === '' ? '' : JSON.stringify(value), { expires, path });
    }

    /**
     * 从 cookie 中移除 key
     * @param key
     */
    removeCookie(key) {
        Cookies.remove(key);
    }

    /**
     * 获取 token
     * @returns {string}
     */
    getToken() {
        // return localStorage.getItem('token') || '';
        return Cookies.get('token') || '';
    }

    /**
     * 把 token 存入 localStorage
     * @param token
     * @returns {boolean}
     */
    setToken(token) {
        // this.set('token', token);
        Cookies.set('token', token);
        return !!this.getToken();
    }
}

export default new Storage();
