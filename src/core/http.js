import config from '../config';

import jQuery from 'jquery';

class Http {
    constructor() {
        this.ApiPrefix = config.API_PREFIX;

        console.log(this.ApiPrefix);
    }

    /**
     * GET (SELECT)
     * @param url
     * @param params
     * @param callback
     * @returns {*}
     */
    get(url, params, callback) {
        return jQuery.get(url, params, callback);
    }

    /**
     * POST (CREATE)
     * @param url
     * @param data
     * @param callback
     * @returns {*}
     */
    post(url, data, callback) {
        return jQuery.post(url, data, callback);
    }
}

export default new Http();
