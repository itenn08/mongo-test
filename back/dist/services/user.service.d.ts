import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { UserDto, UserUpdateDto } from "src/dto/user.dto";
import { User } from "../interfaces/user.interface";
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(userDto: UserDto): Promise<{
        username: string;
        accessToken: string;
    }>;
    login(user: User): Promise<{
        username: string;
        accessToken: string;
    }>;
    validateUser(email: string, pass: string): Promise<User>;
    findOne(email: string): Promise<User>;
    findAll(pageIndex: number, pageSize?: number): Promise<{
        data: {
            id: any;
            email: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date;
            role: string;
            country: string;
            city: string;
        }[];
        page: number;
        total: number;
    }>;
    update(id: string, postData: UserUpdateDto): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
