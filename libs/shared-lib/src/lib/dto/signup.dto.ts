import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignupDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
