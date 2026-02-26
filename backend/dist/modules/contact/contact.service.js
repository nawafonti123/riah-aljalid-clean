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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const nodemailer = require("nodemailer");
let ContactService = class ContactService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendMessage(createContactDto) {
        const savedMessage = await this.prisma.contactMessage.create({
            data: createContactDto,
        });
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: `"رياح الجليد" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            subject: `رسالة جديدة من ${createContactDto.name}`,
            text: `
        الاسم: ${createContactDto.name}
        البريد الإلكتروني: ${createContactDto.email}
        
        الرسالة:
        ${createContactDto.message}
      `,
            html: `
        <h3>رسالة جديدة من موقع رياح الجليد</h3>
        <p><strong>الاسم:</strong> ${createContactDto.name}</p>
        <p><strong>البريد الإلكتروني:</strong> ${createContactDto.email}</p>
        <p><strong>الرسالة:</strong></p>
        <p>${createContactDto.message.replace(/\n/g, '<br>')}</p>
      `,
        };
        await transporter.sendMail(mailOptions);
        return { success: true, id: savedMessage.id };
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactService);
//# sourceMappingURL=contact.service.js.map