import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
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
