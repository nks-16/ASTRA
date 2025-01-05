"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define user roles as an enum for clarity
var UserRole;
(function (UserRole) {
    UserRole["INVESTOR"] = "investor";
    UserRole["PROPOSER"] = "proposer";
})(UserRole || (exports.UserRole = UserRole = {}));
// Define user schema
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: [UserRole.INVESTOR, UserRole.PROPOSER], required: true },
});
// Create a model based on the schema
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
