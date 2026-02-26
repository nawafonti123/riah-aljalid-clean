// backend/src/modules/contact/contact.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() createContactDto: CreateContactDto) {
    return this.contactService.sendMessage(createContactDto);
  }
}