import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateBookDto {
    @ApiProperty({ example: "Foundation", required: true })
    @IsEmail()
    name: string;

    @ApiProperty({ example: "Asimov", required: true })
    author: string;
}
