import { LokiClient } from "./LokiClient";
/**
 * LokiLabels
 * * Interface used for LokiLabels object.
 * Allows for object with unknown number of key:value pairs.
 */
export interface LokiLabels {
    [key: string]: string;
}
/**
 * Log
 * * Allows the sending of log messages to the configured host of the client. Updates
 * * client metrics on success or failure.
 * @param client LokiClient created by the user.
 * @param message Formatted message to be sent.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export declare function Log(client: LokiClient, message: string, labels: LokiLabels, timestamp?: string): Promise<void>;
/**
 * LogError
 * * Prepares an Error message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export declare function LogError(client: LokiClient, message: string, labels: LokiLabels, timestamp?: string): Promise<void>;
/**
 * LogWarning
 * * Prepares an Warning message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export declare function LogWarning(client: LokiClient, message: string, labels: LokiLabels, timestamp?: string): Promise<void>;
/**
 * LogInfo
 * * Prepares an Information message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export declare function LogInfo(client: LokiClient, message: string, labels: LokiLabels, timestamp?: string): Promise<void>;
/**
 * LogDebug
 * * Prepares an Debug message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export declare function LogDebug(client: LokiClient, message: string, labels: LokiLabels, timestamp?: string): Promise<void>;
//# sourceMappingURL=Logger.d.ts.map