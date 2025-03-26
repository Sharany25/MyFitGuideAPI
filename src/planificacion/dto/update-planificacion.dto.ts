import { IsOptional, IsString, IsDate } from "class-validator";

export class UpdatePlanificacionDto {
    @IsOptional()
    @IsString()
    planificacion?: string;

    @IsOptional()
    @IsString()
    grupoMuscular?: string;

    @IsOptional()
    @IsDate()
    diaSemana?: Date;
}
