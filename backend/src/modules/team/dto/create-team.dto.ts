import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}