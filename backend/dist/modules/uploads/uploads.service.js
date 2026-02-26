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
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
let UploadsService = class UploadsService {
    constructor() {
        this.uploadDir = (0, path_1.join)(process.cwd(), 'uploads');
        this.baseUrl = process.env.BACKEND_URL || 'http://localhost:4000';
        if (!(0, fs_1.existsSync)(this.uploadDir)) {
            (0, promises_1.mkdir)(this.uploadDir, { recursive: true });
        }
    }
    async uploadFile(file, type) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const allowedMimeTypes = type === 'image'
            ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            : ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Invalid file type. Allowed ${type} types: ${allowedMimeTypes.join(', ')}`);
        }
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        const filePath = (0, path_1.join)(this.uploadDir, fileName);
        await (0, promises_1.writeFile)(filePath, file.buffer);
        return `${this.baseUrl}/uploads/${fileName}`;
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map