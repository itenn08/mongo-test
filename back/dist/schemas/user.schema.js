"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    role: String,
    country: String,
    city: String,
});
//# sourceMappingURL=user.schema.js.map