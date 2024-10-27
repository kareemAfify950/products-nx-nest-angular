import { IsString, IsNumber, IsPositive } from 'class-validator';

export class ProductDTO {
    @IsString()
    name!: string;

    @IsNumber()
    @IsPositive()
    price!: number;

    @IsNumber()
    @IsPositive()
    remaining!: number;

}
