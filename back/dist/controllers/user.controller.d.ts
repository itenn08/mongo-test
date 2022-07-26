import { UserDto, UserUpdateDto } from "src/dto/user.dto";
import { UserService } from "src/services/user.service";
import { User } from "src/interfaces/user.interface";
import { PaginationParams } from "src/dto/pagination.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(userDto: UserDto): Promise<{
        username: string;
        accessToken: string;
    }>;
    login(req: any): Promise<{
        username: string;
        accessToken: string;
    }>;
    findAll({ pageIndex, pageSize }: PaginationParams): Promise<{
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
    findOne(email: string): Promise<User>;
    updatePost(id: string, body: UserUpdateDto): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(id: string): Promise<User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
