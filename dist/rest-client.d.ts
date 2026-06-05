import { Logger } from 'homebridge';
import { AxiosRequestConfig } from 'axios';
import { SinopePlatformConfig } from './config';
export declare class NeviwebRestClient {
    private readonly config;
    private readonly log;
    private access;
    private iat;
    private refresh;
    private connected;
    private lock;
    constructor(config: SinopePlatformConfig, log: Logger);
    login(): Promise<boolean>;
    connect(): Promise<boolean>;
    logout(): Promise<boolean>;
    request<T = void>(options: AxiosRequestConfig & {
        url: string;
    }): Promise<T>;
}
//# sourceMappingURL=rest-client.d.ts.map