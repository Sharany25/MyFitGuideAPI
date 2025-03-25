import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMetricaDto {
  @IsNotEmpty()
  @IsNumber()
  estatura: number;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsNumber()
  pulsaciones: number;

  @IsNotEmpty()
  @IsString()
  nivelActividad: string;

  @IsNotEmpty()
  @IsNumber()
  masaMuscular: number;
}
