import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { UserDto } from "src/dto/user.dto";
import { User, UserEdited } from "../interfaces/user.interface";
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
    findAll(): Promise<UserEdited[]>;
    delete(id: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
