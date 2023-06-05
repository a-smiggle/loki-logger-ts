"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LogDebug = exports.LogInfo = exports.LogWarning = exports.LogError = exports.Log = void 0;
/**
 * LEVELS
 * * String array used when formatting messages.
 */
var LEVELS = ["ERR", "WARN", "INFO", "DEBUG"];
/**
 * FormatLabels
 * * Formats LokiLabels into the compatible string.
 * @param labels LokiLabels object that contains the messages labels.
 * @returns Formatted string.
 */
var FormatLabels = function (labels) {
    return "{".concat(Object.keys(labels)
        .map(function (a) { return "".concat(a, "=\"").concat(labels[a], "\""); })
        .join(","), "}");
};
/**
 * FormatMessage
 * * Formats severity messages. Eg ERR, WARN ...
 * @param level Severity Level.
 * @param message Message being sent.
 * @returns Formatted string.
 */
var FormatMessage = function (level, message) {
    return "[".concat(level, "] ").concat(message);
};
/**
 * GetTime
 * * Checks if ticker is enabled. If so get latest time from client, otherwise creates its own.
 * @param client LokiClient created by the user.
 * @returns Timestamp string.
 */
var GetTime = function (client) {
    if (client.ticker)
        return client.time;
    return new Date().toISOString();
};
/**
 * Log
 * * Allows the sending of log messages to the configured host of the client. Updates
 * * client metrics on success or failure.
 * @param client LokiClient created by the user.
 * @param message Formatted message to be sent.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
function Log(client, message, labels, timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.instance
                        .post("", JSON.stringify({
                        streams: [
                            {
                                labels: FormatLabels(labels),
                                entries: [
                                    {
                                        ts: timestamp !== null && timestamp !== void 0 ? timestamp : GetTime(client),
                                        line: "".concat(message)
                                    },
                                ]
                            },
                        ]
                    }))
                        .then(function (response) {
                        client.success();
                    })["catch"](function (error) {
                        client.failure();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.Log = Log;
/**
 * LogError
 * * Prepares an Error message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
function LogError(client, message, labels, timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Log(client, FormatMessage(LEVELS[0], message), labels, timestamp)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.LogError = LogError;
/**
 * LogWarning
 * * Prepares an Warning message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
function LogWarning(client, message, labels, timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Log(client, FormatMessage(LEVELS[1], message), labels, timestamp)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.LogWarning = LogWarning;
/**
 * LogInfo
 * * Prepares an Information message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
function LogInfo(client, message, labels, timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Log(client, FormatMessage(LEVELS[2], message), labels, timestamp)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.LogInfo = LogInfo;
/**
 * LogDebug
 * * Prepares an Debug message to be sent. Once ready sends it to Log.
 * @param client LokiClient created by the user.
 * @param message Unformatted message to be sent. Message will be formatted before forwarded.
 * @param labels Unformatted messages to be sent.
 * @param timestamp Formatted timestamp passed by the user. If none one will be created.
 */
function LogDebug(client, message, labels, timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Log(client, FormatMessage(LEVELS[3], message), labels, timestamp)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.LogDebug = LogDebug;
