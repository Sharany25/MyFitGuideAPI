import { IsInt, IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateRutinaDto {
    @IsOptional()
    @IsString()
    idRutina?: string;

    @IsOptional()
    @IsString()
    nombreRutina?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    pasos?: string;

    @IsOptional()
    @IsNumber()
    @IsInt()
    repeticiones?: number;

}
