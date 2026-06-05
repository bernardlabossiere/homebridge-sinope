import { Logger } from 'homebridge';
import { SinopePlatformConfig } from './config';
import { SinopeDevice, SinopeThermostatState, SinopeThermostatStateRequest, SinopeSwitchState, SinopeSwitchStateRequest, SinopeDimmerState, SinopeDimmerStateRequest } from './types';
export declare class NeviwebApi {
    private readonly config;
    private readonly log;
    private readonly restClient;
    private myq;
    constructor(config: SinopePlatformConfig, log: Logger);
    login(): Promise<boolean>;
    logout(): Promise<boolean>;
    fetchDevices(): Promise<SinopeDevice[]>;
    fetchThermostat(id: number): Promise<SinopeThermostatState>;
    fetchSwitch(id: number): Promise<SinopeSwitchState>;
    fetchDimmer(id: number): Promise<SinopeDimmerState>;
    updateThermostat(id: number, data: SinopeThermostatStateRequest): Promise<SinopeThermostatState>;
    updateSwitch(id: number, data: SinopeSwitchStateRequest): Promise<SinopeSwitchState>;
    updateDimmer(id: number, data: SinopeDimmerStateRequest): Promise<SinopeDimmerState>;
}
//# sourceMappingURL=neviweb.d.ts.map