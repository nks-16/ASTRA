"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const authoRouters_1 = __importDefault(require("./routes/authoRouters"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/auth', authoRouters_1.default);
// Database connection
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-stack', {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
