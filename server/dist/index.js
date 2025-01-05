"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Define routes
app.use('/api/auth', auth_route_1.default);
// MongoDB connection
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/greenfinance', {}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
