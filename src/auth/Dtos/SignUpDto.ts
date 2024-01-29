import {IsEmail,IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    Firstname  : string

    @IsNotEmpty()
    Lastname:  string

    @IsNotEmpty()
    @IsPhoneNumber('DZ') 
    Phone  : string

    @IsNotEmpty()
    @IsEmail()
    Email  : string

    @IsNotEmpty()
    @MinLength(8)
    Password  : string 
}