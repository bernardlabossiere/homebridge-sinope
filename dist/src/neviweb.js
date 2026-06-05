"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeviwebApi = void 0;
const rest_client_1 = require("./rest-client");
const async_await_queue_1 = require("async-await-queue");
const myPriority = -1;
class NeviwebApi {
    constructor(config, log) {
        this.config = config;
        this.log = log;
        this.restClient = new rest_client_1.NeviwebRestClient(this.config, this.log);
        this.myq = new async_await_queue_1.Queue(1, 120);
    }
    async login() {
        return this.restClient.login();
    }
    async logout() {
        return this.restClient.logout();
    }
    async fetchDevices() {
        return this.restClient.request({
            //url: this.config.url + '/devices' + '?location$id=' + this.config.locationid,
            url: this.config.url + '/devices' + ((this.config.locationid !== undefined) ? '?location$id=' + this.config.locationid : ''),
            method: 'GET',
        });
    }
    async fetchThermostat(id) {
        return this.restClient.request({
            url: this.config.url + '/device/' + id +
                '/attribute?attributes=roomTemperature,outputPercentDisplay,setpointMode,alarmsActive0,roomSetpoint',
            method: 'GET',
        });
    }
    async fetchSwitch(id) {
        return this.restClient.request({
            url: this.config.url + '/device/' + id +
                '/attribute?attributes=onOff',
            method: 'GET',
        });
    }
    async fetchDimmer(id) {
        return this.restClient.request({
            url: this.config.url + '/device/' + id +
                '/attribute?attributes=onOff,intensity',
            method: 'GET',
        });
    }
    async updateThermostat(id, data) {
        return this.restClient.request({
            url: this.config.url + '/device/' + id + '/attribute',
            method: 'PUT',
            data: data,
        });
    }
    async updateSwitch(id, data) {
        const me = Symbol();
        await this.myq.wait(me, myPriority);
        const reqresult = this.restClient.request({
            url: this.config.url + '/device/' + id + '/attribute',
            method: 'PUT',
            data: data,
        });
        this.myq.end(me);
        return reqresult;
    }
    async updateDimmer(id, data) {
        const me = Symbol();
        await this.myq.wait(me, myPriority);
        const reqresult = this.restClient.request({
            url: this.config.url + '/device/' + id + '/attribute',
            method: 'PUT',
            data: data,
        });
        this.myq.end(me);
        return reqresult;
    }
}
exports.NeviwebApi = NeviwebApi;
//# sourceMappingURL=neviweb.js.map