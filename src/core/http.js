import config from '../config';
import storage from './storage';

import jQuery from 'jquery';

class Http {
    constructor() {
        this.apiPrefix = config.API_PREFIX;
    }

    /**
     * jQuery.ajax(url, [settings])
     * @param url
     * @param settings
     * @returns {*}
     * @private
     */
    _request(url, settings = {}) {
        settings.headers = {
            'Accept':           'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        };

        const token = storage.getToken();
        if (!!token) {
            settings.headers['Authorization'] = token;
        }

        return jQuery.ajax(url, settings);
    }

    /**
     * GET
     * @param url
     * @param data
     * @param success function to be called if the request succeeds
     * @param error function to be called if the request fails
     * @returns {*}
     */
    get(url, data, success = () => {}, error = () => {}) {
        return this._request(this.apiPrefix + url, {
            method: 'GET',
            data,
            success,
            error,
        });
    }

    /**
     * POST
     * @param url
     * @param data
     * @param success function to be called if the request succeeds
     * @param error function to be called if the request fails
     * @returns {*}
     */
    post(url, data, success = () => {}, error = () => {}) {
        return this._request(this.apiPrefix + url, {
            method: 'POST',
            data,
            success,
            error,
        });
    }

    /**
     * DELETE
     * @param url
     * @param data
     * @param success function to be called if the request succeeds
     * @param error function to be called if the request fails
     * @returns {*}
     */
    delete(url, data, success = () => {}, error = () => {}) {
        return this._request(this.apiPrefix + url, {
            method: 'DELETE',
            data,
            success,
            error,
        });
    }
}

export default new Http();
