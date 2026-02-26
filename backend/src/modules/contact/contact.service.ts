// backend/src/modules/contact/contact.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(createContactDto: CreateContactDto) {
    // حفظ الرسالة في قاعدة البيانات
    // تأكد من تشغيل 'npx prisma generate' بعد إضافة نموذج ContactMessage في schema.prisma
    const savedMessage = await (this.prisma as any).contactMessage.create({
    data: createContactDto,
    });

    // إعداد البريد الإلكتروني
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
}