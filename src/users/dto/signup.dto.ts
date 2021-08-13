import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    readonly id: string;
    @IsString()
    readonly name: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
}
