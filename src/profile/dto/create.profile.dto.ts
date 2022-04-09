import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, MaxLength, MinLength} from "class-validator";

export class CreateProfileDto {
    @ApiProperty({ example: "atakan.beddall@gmail.com", required: true })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "AtakanSteven", required: true })
    @MaxLength(16, { message: "username must have maximum 16 characters" })
    @MinLength(4, { message: "username must have minimum 4 characters" })
    username: string;
}
