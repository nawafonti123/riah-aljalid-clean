import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyImageDto } from './create-company-image.dto';

export class UpdateCompanyImageDto extends PartialType(CreateCompanyImageDto) {}