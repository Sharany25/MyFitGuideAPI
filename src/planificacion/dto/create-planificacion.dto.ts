import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePlanificacionDto {
    @IsNotEmpty()
    @IsString()
    idPlanificacion: string;

    @IsNotEmpty()
    @IsString()
    planificacion: string;

    @IsNotEmpty()
    @IsString()
    grupoMuscular: string;

    @IsNotEmpty()
    @IsDate()
    diaSemana: Date;
}