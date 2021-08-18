import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @ApiProperty()
    @IsString()
    readonly name: string;
    @ApiProperty()
    @IsEmail()
    readonly email: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}
