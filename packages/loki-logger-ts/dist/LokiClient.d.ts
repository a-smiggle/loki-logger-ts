/// <reference types="node" />
import { AxiosInstance } from "axios";
/**
 * LokiAuth
 * * Interface used for the authentication data of the LokiClient.
 * Basic auth used username and password.
 * Secret is used when authenticating with Grafana Cloud.
 */
interface LokiAuth {
    username?: string;
    password?: string;
    secret?: string;
}
/**
 * LokiClient
 * * LokiClient class that prepares Axios instance for sending messages and ticker to update timestamps if enabled.
 */
export declare class LokiClient {
    private metrics;
    url: string;
    auth?: LokiAuth;
    instance: AxiosInstance;
    time: string;
    ticker?: NodeJS.Timer;
    /**
     * LokiClient constructor
     * * Constructor preparing Axios instance and ticker if enabled.
     * @param url Loki host URL.
     * @param auth LokiAuth details.
     * @param ticker Ticker enabled/disabled. Disabled by default.
     */
    constructor(url: string, auth?: LokiAuth, ticker?: boolean);
    /**
     * showMetrics
     * * Prints current Loki Logger Metrics.
     */
    showMetrics(): void;
    /**
     * getMetrics
     * * Returns the Loki Logger Metrics in an object.
     * @returns {success: number, failed: number}
     */
    getMetrics(): {
        success: number;
        failed: number;
    };
    /**
     * cleanMetrics
     * * Resets the Loki Logger Metrics.
     */
    clearMetrics(): void;
    /**
     * success
     * Increments Success metrics by one.
     */
    success(): void;
    /**
     * failure
     * Increments Failure metrics by one.
     */
    failure(): void;
    /**
     * startTicker
     * * Creates the ticker that will update the timestamp every second.
     * This is useful if a large amount of messages will be sent.
     */
    startTicker(): void;
    /**
     * stopTicker
     * * Stops the ticker if being used.
     * This is required if application will be closed.
     */
    stopTicker(): void;
}
export {};
//# sourceMappingURL=LokiClient.d.ts.map