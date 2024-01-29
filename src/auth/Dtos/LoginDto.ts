import {IsEmail,IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    @MinLength(4)
    Password: string;
} 