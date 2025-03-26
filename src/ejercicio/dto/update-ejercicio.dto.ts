import { IsDecimal, IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class UpdateEjercicioDto {
    @IsOptional()
    @IsString()
    idEjercicio?: string;

    @IsOptional()
    @IsString()
    nombreEjercicio?: string;

    @IsOptional()
    @IsString()
    grupoMuscular?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    nivelDificultad?: string;

    @IsOptional()
    @IsDecimal()
    calorias?: number;

    @IsOptional()
    @IsString()
    areaEntrenamiento?: string;
}
