import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @IsString()
    readonly name: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
}
