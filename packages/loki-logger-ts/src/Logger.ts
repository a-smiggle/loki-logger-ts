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
 * LEVELS
 * * String array used when formatting messages.
 */
const LEVELS = ["ERR", "WARN", "INFO", "DEBUG"];

/**
 * FormatLabels
 * * Formats LokiLabels into the compatible string.
 * @param labels LokiLabels object that contains the messages labels.
 * @returns Formatted string.
 */
const FormatLabels = (labels: LokiLabels):string =>
  `{${Object.keys(labels)
    .map((a) => `${a}="${labels[a]}"`)
    .join(",")}}`;

/**
 * FormatMessage
 * * Formats severity messages. Eg ERR, WARN ...
 * @param level Severity Level.
 * @param message Message being sent.
 * @returns Formatted string.
 */
const FormatMessage = (level: string, message: string):string =>
  `[${level}] ${message}`;

/**
 * GetTime
 * * Checks if ticker is enabled. If so get latest time from client, otherwise creates its own.
 * @param client LokiClient created by the user.
 * @returns Timestamp string.
 */
const GetTime = (client: LokiClient) => {
    if(client.ticker) return client.time;
    return new Date().toISOString()
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
export async function Log(
  client: LokiClient,
  message: string,
  labels: LokiLabels,
  timestamp?: string
) {
  await client.instance
    .post(
      "",
      JSON.stringify({
        streams: [
          {
            labels: FormatLabels(labels),
            entries: [
              {
                ts: timestamp ?? GetTime(client),
                line: `${message}`,
              },
            ],
          },
        ],
      })
    )
    .then(function (response) {// eslint-disable-line @typescript-eslint/no-unused-vars
      client.success();
    })
    .catch(function (error) {// eslint-disable-line @typescript-eslint/no-unused-vars
      client.failure();
    });
}

/**
 * LogError
 * * Prepares an Error message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export async function LogError(
  client: LokiClient,
  message: string,
  labels: LokiLabels,
  timestamp?: string
) {
  await Log(client, FormatMessage(LEVELS[0], message), labels, timestamp);
}

/**
 * LogWarning
 * * Prepares an Warning message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export async function LogWarning(
  client: LokiClient,
  message: string,
  labels: LokiLabels,
  timestamp?: string
) {
  await Log(client, FormatMessage(LEVELS[1], message), labels, timestamp);
}

/**
 * LogInfo
 * * Prepares an Information message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export async function LogInfo(
  client: LokiClient,
  message: string,
  labels: LokiLabels,
  timestamp?: string
) {
  await Log(client, FormatMessage(LEVELS[2], message), labels, timestamp);
}

/**
 * LogDebug
 * * Prepares an Debug message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
export async function LogDebug(
  client: LokiClient,
  message: string,
  labels: LokiLabels,
  timestamp?: string
) {
  await Log(client, FormatMessage(LEVELS[3], message), labels, timestamp);
}
