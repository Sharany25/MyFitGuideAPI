import { IsDecimal, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateEjercicioDto {
    @IsNotEmpty()
    @IsString()
    idEjercicio: string;

    @IsNotEmpty()
    @IsString()
    nombreEjercicio: string;

    @IsNotEmpty()
    @IsString()
    grupoMuscular: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsString()
    nivelDificultad: string;

    @IsNotEmpty()
    @IsDecimal()
    calorias: number;

    @IsNotEmpty()
    @IsString()
    areaEntrenamiento: string;
}
