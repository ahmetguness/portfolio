"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ quiet: true });
console.log(`DB Config: User: ${process.env.DB_USER}, Host: ${process.env.DB_HOST}, DB: ${process.env.DB_NAME}, Port: ${process.env.DB_PORT}, Pass: ******`);
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD || undefined,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});
exports.default = pool;
