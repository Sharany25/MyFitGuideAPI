import { IsString, IsNotEmpty, IsNumber, IsNotEmptyObject, IsOptional, IsDecimal } from "class-validator";
export class CreateRecetaDto {
    @IsNotEmpty()
    @IsString()
    idReceta: string;

    @IsNotEmpty()
    @IsString()
    nombreReceta:string;

    //Agregar llave foranea de idIngredientes
    @IsNotEmpty()
    @IsString()
    descripcion: string;

    @IsNotEmpty()
    @IsString()
    costo: string;

    @IsNotEmpty()
    @IsDecimal()
    calorias: number;
}