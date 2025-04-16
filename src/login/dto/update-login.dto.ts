import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(LoginDto) {}
