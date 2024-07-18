import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { CustomerState } from '../customer.schema';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsBoolean()
  verifiedEmail: boolean;

  @IsBoolean()
  sendEmailWelcome: boolean;

  @IsNotEmpty()
  @IsEnum(CustomerState)
  state: CustomerState;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
