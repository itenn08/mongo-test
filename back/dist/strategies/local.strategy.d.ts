import { Strategy } from 'passport-local';
import { UserService } from '../services/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(email: string, password: string): Promise<any>;
}
export {};
