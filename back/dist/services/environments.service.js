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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentsService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
let EnvironmentsService = class EnvironmentsService {
    constructor(_configService) {
        this._configService = _configService;
        this._connectionString = this._getConnectionStringFromEnvFile();
    }
    get connectionString() {
        return this._connectionString;
    }
    _getConnectionStringFromEnvFile() {
        const DB_USER = this._configService.get('DB_USER');
        const DB_PASSWORD = this._configService.get('DB_PASSWORD');
        const DB_HOST = this._configService.get('DB_HOST');
        const DB_NAME = this._configService.get('DB_NAME');
        return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c9jvb.mongodb.net/?retryWrites=true&w=majority`;
    }
};
EnvironmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EnvironmentsService);
exports.EnvironmentsService = EnvironmentsService;
//# sourceMappingURL=environments.service.js.map