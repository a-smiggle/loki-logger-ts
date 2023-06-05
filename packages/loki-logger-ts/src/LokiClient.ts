import axios, { AxiosInstance } from "axios";

/**
 * LokiMetrics
 * * Interface used for metrics of the LokiClient.
 */
interface LokiMetrics {
  success: number;
  failed: number;
}

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
export class LokiClient {
  private metrics: LokiMetrics;
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
  constructor(
    url: string,
    auth?: LokiAuth, ticker?: boolean
  ) {
    this.url = url;
    this.instance = axios.create({
      baseURL: url,
      timeout: 1000,
      headers: { "Content-type": "application/json" },
    });
    if(auth){
      this.auth = auth;
      if (auth.username && auth.password) {
        this.instance = axios.create({
          baseURL: url,
          timeout: 1000,
          headers: { "Content-type": "application/json" },
          auth: { username: auth.username, password: auth.password },
        });
      } else if (auth.secret) {
        this.instance = axios.create({
          baseURL: url,
          timeout: 1000,
          headers: {
            "Content-type": "application/json",
            Authorization: `Basic ${auth.secret}`,
          },
        });
      } 
    }
    this.metrics = { success: 0, failed: 0 };
    this.time = new Date().toISOString();
    if(ticker) this.startTicker();
  }

  /**
   * showMetrics
   * * Prints current Loki Logger Metrics.
   */
  showMetrics() {
    console.log("Loki Logger Metrics");
    console.log(`Successful Messages: ${this.metrics.success}`);
    console.log(`Failed Messages: ${this.metrics.failed}`);
  }

  /**
   * getMetrics
   * * Returns the Loki Logger Metrics in an object.
   * @returns {success: number, failed: number}
   */
  getMetrics():{success: number, failed:number} {
    return ({success: this.metrics.success, failed: this.metrics.failed});
  }

  /**
   * cleanMetrics
   * * Resets the Loki Logger Metrics.
   */
  clearMetrics() {
    this.metrics = { success: 0, failed: 0 };
  }

  /**
   * success
   * Increments Success metrics by one.
   */
  success() {
    this.metrics.success++;
  }

  /**
   * failure
   * Increments Failure metrics by one.
   */
  failure() {
    this.metrics.failed++;
  }

  /**
   * startTicker
   * * Creates the ticker that will update the timestamp every second. 
   * This is useful if a large amount of messages will be sent.
   */
  startTicker() {
    this.ticker = setInterval(() => {
      this.time = new Date().toISOString();
    }, 1000)
  }

  /**
   * stopTicker
   * * Stops the ticker if being used.
   * This is required if application will be closed.
   */
  stopTicker() {
    if(this.ticker){
      clearInterval(this.ticker);
      this.ticker = undefined;
    }
  }
}
