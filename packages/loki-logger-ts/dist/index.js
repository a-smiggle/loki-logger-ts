"use strict";
exports.__esModule = true;
exports.LogWarning = exports.LogInfo = exports.LogError = exports.LogDebug = exports.Log = exports.LokiClient = void 0;
var LokiClient_1 = require("./LokiClient");
exports.LokiClient = LokiClient_1.LokiClient;
var Logger_1 = require("./Logger");
exports.Log = Logger_1.Log;
exports.LogDebug = Logger_1.LogDebug;
exports.LogError = Logger_1.LogError;
exports.LogInfo = Logger_1.LogInfo;
exports.LogWarning = Logger_1.LogWarning;