// backend/src/modules/company-images/dto/update-company-image.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyImageDto } from './create-company-image.dto';

export class UpdateCompanyImageDto extends PartialType(CreateCompanyImageDto) {}