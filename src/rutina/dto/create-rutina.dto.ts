import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRutinaDto {
    @IsNotEmpty()
    @IsString()
    idRutina: string;

    @IsNotEmpty()
    @IsString()
    nombreRutina: string;

    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsString()
    pasos: string;

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    repeticiones: number;

}
