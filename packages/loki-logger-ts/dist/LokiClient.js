"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.LokiClient = void 0;
var axios_1 = __importDefault(require("axios"));
/**
 * LokiClient
 * * LokiClient class that prepares Axios instance for sending messages and ticker to update timestamps if enabled.
 */
var LokiClient = /** @class */ (function () {
    /**
     * LokiClient constructor
     * * Constructor preparing Axios instance and ticker if enabled.
     * @param url Loki host URL.
     * @param auth LokiAuth details.
     * @param ticker Ticker enabled/disabled. Disabled by default.
     */
    function LokiClient(url, auth, ticker) {
        this.url = url;
        this.instance = axios_1["default"].create({
            baseURL: url,
            timeout: 1000,
            headers: { "Content-type": "application/json" }
        });
        if (auth) {
            this.auth = auth;
            if (auth.username && auth.password) {
                this.instance = axios_1["default"].create({
                    baseURL: url,
                    timeout: 1000,
                    headers: { "Content-type": "application/json" },
                    auth: { username: auth.username, password: auth.password }
                });
            }
            else if (auth.secret) {
                this.instance = axios_1["default"].create({
                    baseURL: url,
                    timeout: 1000,
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Basic ".concat(auth.secret)
                    }
                });
            }
        }
        this.metrics = { success: 0, failed: 0 };
        this.time = new Date().toISOString();
        if (ticker)
            this.startTicker();
    }
    /**
     * showMetrics
     * * Prints current Loki Logger Metrics.
     */
    LokiClient.prototype.showMetrics = function () {
        console.log("Loki Logger Metrics");
        console.log("Successful Messages: ".concat(this.metrics.success));
        console.log("Failed Messages: ".concat(this.metrics.failed));
    };
    /**
     * getMetrics
     * * Returns the Loki Logger Metrics in an object.
     * @returns {success: number, failed: number}
     */
    LokiClient.prototype.getMetrics = function () {
        return ({ success: this.metrics.success, failed: this.metrics.failed });
    };
    /**
     * cleanMetrics
     * * Resets the Loki Logger Metrics.
     */
    LokiClient.prototype.clearMetrics = function () {
        this.metrics = { success: 0, failed: 0 };
    };
    /**
     * success
     * Increments Success metrics by one.
     */
    LokiClient.prototype.success = function () {
        this.metrics.success++;
    };
    /**
     * failure
     * Increments Failure metrics by one.
     */
    LokiClient.prototype.failure = function () {
        this.metrics.failed++;
    };
    /**
     * startTicker
     * * Creates the ticker that will update the timestamp every second.
     * This is useful if a large amount of messages will be sent.
     */
    LokiClient.prototype.startTicker = function () {
        var _this = this;
        this.ticker = setInterval(function () {
            _this.time = new Date().toISOString();
        }, 1000);
    };
    /**
     * stopTicker
     * * Stops the ticker if being used.
     * This is required if application will be closed.
     */
    LokiClient.prototype.stopTicker = function () {
        if (this.ticker) {
            clearInterval(this.ticker);
            this.ticker = undefined;
        }
    };
    return LokiClient;
}());
exports.LokiClient = LokiClient;
