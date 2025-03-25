import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate } from "class-validator";
export class CreateDietaDto {
    @IsNotEmpty()
    @IsString()
    idDieta: string;

    @IsString()
    @IsNotEmpty()
    NombreDieta: string;

    @IsNotEmpty()
    @IsDate()
    fechaInicio: Date;

    @IsNotEmpty()
    @IsDate()
    fechaFin: Date;

    @IsNotEmpty()
    @IsString()
    diaSemana: string;

    @IsNotEmpty()
    @IsString()
    tiempo: string;
}