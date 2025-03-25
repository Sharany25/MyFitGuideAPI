import { IsOptional, IsString, IsNumber, IsDecimal, Min } from "class-validator";

export class UpdateIngredienteDto {

    @IsOptional()
    @IsString()
    nombreIngrediente?: string;

    @IsOptional()
    @IsNumber()
    @IsDecimal()
    @Min(0)
    costo?: number;

    @IsOptional()
    @IsString()
    link?: string;
}
