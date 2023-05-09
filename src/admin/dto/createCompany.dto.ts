import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  company_address: string;

  @IsNotEmpty()
  @IsString()
  company_description: string;

  @IsNotEmpty()
  @IsString()
  company_admin_email: string;

  @IsNotEmpty()
  @IsArray()
  table_data: [];
}
