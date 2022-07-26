import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    country?: string;
    city?: string;
    role?: string;
}>;
