import { PartialType } from '@nestjs/mapped-types';
import { CreateMetricaDto } from './create-metrica.dto';
import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class UpdateMetricaDto extends PartialType(CreateMetricaDto) {
    @IsString()
    genero?: string;

    @IsNumber()
    altura?: number;

    @IsNumber()
    peso?: number;

    @IsString()
    objetivo?: string;

    @IsArray()
    @IsString({ each: true })
    alergias?: string[];

    @IsNotEmpty()
    @IsString()
    presupuesto?: string;
}