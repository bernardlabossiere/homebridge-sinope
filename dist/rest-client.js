"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeviwebRestClient = void 0;
const axios_1 = __importDefault(require("axios"));
const async_lock_1 = __importDefault(require("async-lock"));
const tokenExpiration = (9.5 * 60 * 1000);
const CLIENT_KEY = 'rest-client';
class NeviwebRestClient {
    constructor(config, log) {
        this.config = config;
        this.log = log;
        this.access = '';
        this.iat = 0;
        this.refresh = '';
        this.connected = false;
        this.lock = new async_lock_1.default({ timeout: 5000 });
    }
    async login() {
        this.log.debug('login with config ' + JSON.stringify(this.config));
        const req = {
            method: 'POST',
            url: this.config.url + '/login',
            data: {
                username: this.config.username,
                password: this.config.password,
                interface: 'neviweb',
                stayConnected: 1,
            },
        };
        try {
            const response = await (0, axios_1.default)(req);
            if (response.data.error) {
                throw response.data.error;
            }
            this.access = response.data.session;
            this.iat = response.data.iat;
            this.refresh = response.data.refreshToken;
            this.connected = true;
            return true;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                switch (error.code) {
                    case 'ACCSESSEXC': {
                        this.log.error('too many session open on the neviweb API, please retry in 10 minutes');
                        break;
                    }
                    case 'USRLOCKED':
                    case 'USRMAXLOGRETRY': {
                        this.log.error('too many authentication attempt failed, the account is currently locked');
                        break;
                    }
                }
                return false;
            }
            this.log.error('could not authenticate against the neviweb API (error ' + JSON.stringify(error) + ')');
            return false;
        }
        // if (this.auth.iat && this.auth.iat + tokenExpiration > Date.now()) {
        //   this.log.debug('the neviweb session is still active,');
        // }
    }
    async connect() {
        this.log.debug('renewing the access token with the refresh token');
        const req = {
            method: 'POST',
            url: this.config.url + '/connect',
            headers: {
                refreshToken: this.refresh,
            },
        };
        try {
            const response = await (0, axios_1.default)(req);
            if (response.data.error) {
                throw response.data.error;
            }
            this.access = response.data.session;
            this.iat = response.data.iat;
            this.refresh = response.data.refreshToken;
            this.connected = true;
            this.log.debug('successfully renewed the neviweb session');
            return true;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                switch (error.code) {
                    case 'ACCSESSEXC': {
                        this.log.error('too many session open on the neviweb API, please retry in 10 minutes');
                        break;
                    }
                    case 'USRLOCKED':
                    case 'USRMAXLOGRETRY': {
                        this.log.error('too many authentication attempt failed, the account is currently locked');
                        break;
                    }
                    case 'USRSESSEXP': {
                        this.log.error('the neviweb session expired');
                        break;
                    }
                }
            }
            this.log.error('could not reconnect against the neviweb API (error ' + JSON.stringify(error) + ')');
            return false;
        }
    }
    async logout() {
        const req = {
            method: 'GET',
            url: this.config.url + '/logout',
            headers: {
                'session-id': this.access,
                refreshToken: this.refresh,
            },
        };
        try {
            const response = await (0, axios_1.default)(req);
            if (!response.data.success) {
                throw response.data;
            }
            this.connected = false;
            return true;
        }
        catch (error) {
            this.log.debug('unexpected error while logging out: ' + JSON.stringify(error));
        }
        return false;
    }
    async request(options) {
        this.log.debug('requesting ' + options.url);
        if (!this.connected) {
            this.log.warn('no longer connected to the Neviweb API, ignoring this request');
            await this.lock.acquire(CLIENT_KEY, async () => {
                await this.logout();
                await this.login();
            });
            //throw new Error('expired session');
        }
        // Require the lock to be acquired when determining whether the session is still valid, and optionally renewing it
        await this.lock.acquire(CLIENT_KEY, async () => {
            if (Date.now() >= this.iat + tokenExpiration) {
                this.log.debug('the neviweb session expired, renewing it first...');
                const connected = await this.connect();
                if (!connected) {
                    this.log.error('the session expired and could not be renewed, abording this request');
                    this.connected = false;
                    throw new Error('expired session');
                }
            }
        });
        // TODO(palourde): Verify that the access token is still valid with this.iat and optionally refresh it with this.refresh
        if (!options.headers) {
            options.headers = {};
        }
        options.headers['session-id'] = this.access;
        try {
            const response = await (0, axios_1.default)(options);
            this.log.debug('received ' + JSON.stringify(response.data));
            if (response.data.error) {
                throw response.data;
            }
            const data = response.data;
            return data;
            // return true;
        }
        catch (error) {
            this.log.debug('unexpected error during request: ' + JSON.stringify(error));
            throw error;
        }
    }
}
exports.NeviwebRestClient = NeviwebRestClient;
//# sourceMappingURL=rest-client.js.map