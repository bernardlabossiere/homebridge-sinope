import { PlatformAccessory, CharacteristicValue, CharacteristicSetCallback, CharacteristicGetCallback } from 'homebridge';
import { SinopeDevice } from './types';
import { SinopePlatform } from './platform';
/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export declare class SinopeThermostatAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly device;
    private service;
    private state;
    constructor(platform: SinopePlatform, accessory: PlatformAccessory, device: SinopeDevice);
    /**
     * Handle requests to get the current value of the "Current Heating Cooling State" characteristic
     */
    handleCurrentHeatingCoolingStateGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to get the current value of the "Target Heating Cooling State" characteristic
     */
    handleTargetHeatingCoolingStateGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to set the "Target Heating Cooling State" characteristic
     */
    handleTargetHeatingCoolingStateSet(value: CharacteristicValue, callback: CharacteristicSetCallback): Promise<void>;
    /**
     * Handle requests to get the current value of the "Current Temperature" characteristic
     */
    handleCurrentTemperatureGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to get the current value of the "Target Temperature" characteristic
     */
    handleTargetTemperatureGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to set the "Target Temperature" characteristic
     */
    handleTargetTemperatureSet(value: CharacteristicValue, callback: CharacteristicSetCallback): Promise<void>;
    /**
     * Handle requests to get the current value of the "Temperature Display Units" characteristic
     */
    handleTemperatureDisplayUnitsGet(callback: CharacteristicGetCallback): void;
    /**
     * Handle requests to set the "Temperature Display Units" characteristic
     */
    handleTemperatureDisplayUnitsSet(value: CharacteristicValue, callback: CharacteristicSetCallback): void;
    private getState;
    private updateState;
    private currentEpoch;
    private isValid;
}
export declare class SinopeSwitchAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly device;
    private service;
    private state;
    constructor(platform: SinopePlatform, accessory: PlatformAccessory, device: SinopeDevice);
    /**
     * Handle requests to get the current value of the "On" characteristic
     */
    handleOnGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to set the "On" characteristic
     */
    handleOnSet(value: CharacteristicValue, callback: CharacteristicSetCallback): Promise<void>;
    private getState;
    private updateState;
    private currentEpoch;
    private isValid;
}
export declare class SinopeOutletAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly device;
    private service;
    private state;
    constructor(platform: SinopePlatform, accessory: PlatformAccessory, device: SinopeDevice);
    /**
     * Handle requests to get the current value of the "On" characteristic
     */
    handleOnGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to set the "On" characteristic
     */
    handleOnSet(value: CharacteristicValue, callback: CharacteristicSetCallback): Promise<void>;
    private getState;
    private updateState;
    private currentEpoch;
    private isValid;
}
export declare class SinopeDimmerAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly device;
    private service;
    private state;
    constructor(platform: SinopePlatform, accessory: PlatformAccessory, device: SinopeDevice);
    /**
     * Handle requests to get the current value of the "On" characteristic
     */
    handleOnGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to set the "On" characteristic
     */
    handleOnSet(value: CharacteristicValue, callback: CharacteristicSetCallback): Promise<void>;
    /**
     * Handle requests to get the current value of the "Brightness" characteristic
     */
    handleBrightnessGet(callback: CharacteristicGetCallback): Promise<void>;
    /**
     * Handle requests to set the "Brightness" characteristic
     */
    handleBrightnessSet(value: CharacteristicValue, callback: CharacteristicSetCallback): Promise<void>;
    private getState;
    private updateState;
    private currentEpoch;
    private isValid;
}
//# sourceMappingURL=platformAccessory.d.ts.map