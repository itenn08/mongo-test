"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(userDto) {
        const { email, password } = userDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: hashedPassword,
            city: "",
            country: "",
            firstName: "",
            lastName: "",
            role: "user",
            dateOfBirth: null,
        });
        try {
            const isUsedEmail = await this.findOne(email);
            if (isUsedEmail)
                throw new common_1.ConflictException("User already exists");
            await user.save();
            const payload = {
                email: user.email,
                sub: user._id,
            };
            return {
                username: user.email,
                accessToken: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async login(user) {
        const check = await this.validateUser(user.email, user.password);
        if (!check) {
            throw new common_1.HttpException("Email or password is not correct", common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = {
            email: user.email,
            sub: user._id,
        };
        return {
            username: user.email,
            accessToken: this.jwtService.sign(payload),
        };
    }
    async validateUser(email, pass) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            return null;
        }
        const valid = await bcrypt.compare(pass, user.password);
        if (valid) {
            return user;
        }
        return null;
    }
    async findOne(email) {
        try {
            return this.userModel.findOne({ email }).exec();
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(pageIndex, pageSize) {
        try {
            const users = await this.userModel
                .find()
                .sort({ _id: 1 })
                .skip(pageIndex * pageSize)
                .limit(pageSize)
                .exec();
            const data = await users.map((item) => {
                return {
                    id: item._id,
                    email: item.email,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    dateOfBirth: item.dateOfBirth,
                    role: item.role,
                    country: item.country,
                    city: item.city,
                };
            });
            const total = await this.userModel.count();
            return { data, page: pageIndex, total };
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, postData) {
        try {
            const post = await this.userModel.findByIdAndUpdate({ _id: id }, postData, {
                new: true,
            });
            if (!post) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.BAD_REQUEST);
            }
            return post;
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id) {
        try {
            const deletedUser = await this.userModel
                .findByIdAndRemove({ _id: id })
                .exec();
            if (!deletedUser) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.BAD_REQUEST);
            }
            return deletedUser;
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map