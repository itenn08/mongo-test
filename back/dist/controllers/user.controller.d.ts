import { UserDto } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';
import { User } from 'src/interfaces/user.interface';
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
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    delete(id: string): Promise<User & {
        _id: any;
    }>;
}
