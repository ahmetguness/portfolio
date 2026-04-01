"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const projects_1 = __importDefault(require("./routes/projects"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const settings_1 = __importDefault(require("./routes/settings"));
const proxy_1 = __importDefault(require("./routes/proxy"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config({ quiet: true });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4001;
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/projects', projects_1.default);
app.use('/api/blogs', blogs_1.default);
app.use('/api/blogs', blogs_1.default);
app.use('/api/settings', settings_1.default);
app.use('/api/proxy', proxy_1.default);
app.listen(PORT, async () => {
    try {
        await db_1.default.query(`
            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(255) PRIMARY KEY,
                value TEXT
            );
        `);
        console.log('Settings table ensured');
    }
    catch (err) {
        console.error('Failed to initialize DB:', err);
    }
    console.log(`Server running on port ${PORT}`);
});
