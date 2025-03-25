import { PartialType } from '@nestjs/mapped-types';
import { CreateMetricaDto } from './create-metrica.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMetricaDto extends PartialType(CreateMetricaDto) {
    @IsNotEmpty()
    @IsNumber()
    estatura?: number;

    @IsNotEmpty()
    @IsNumber()
    peso?: number;

    @IsNotEmpty()
    @IsNumber()
    pulsaciones?: number;

    @IsNotEmpty()
    @IsString()
    nivelActividad?: string;

    @IsNotEmpty()
    @IsNumber()
    masaMuscular?: number;

}
