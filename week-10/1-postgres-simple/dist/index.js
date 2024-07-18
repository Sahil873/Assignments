"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var pg_1 = require("pg");
require("dotenv/config");
exports.client = new pg_1.Client({
    connectionString: process.env.DB_URL,
});
