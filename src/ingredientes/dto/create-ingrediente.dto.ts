import { IsNotEmpty, IsString, IsNumber, IsDecimal, Min } from "class-validator";

export class CreateIngredienteDto {
    @IsNotEmpty()
    @IsString()
    idIngredientes: string;

    @IsString()
    nombreIngrediente: string;

    @IsNumber()
    @IsDecimal()
    @Min(0)
    costo: number;

    @IsNotEmpty()
    @IsString()
    link: string;
}
