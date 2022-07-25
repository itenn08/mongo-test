import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    password?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    role?: string;
    country?: string;
    city?: string;
    email?: string;
}>;
