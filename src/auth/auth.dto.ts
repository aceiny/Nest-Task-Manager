import { IsLongitude, IsNotEmpty, IsString, Length } from "class-validator";

export class authDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Length(4)
    password: string;
}