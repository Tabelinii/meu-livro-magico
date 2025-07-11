import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(6, 128)
    password: string;

    @ApiProperty({ required: false })
    @IsOptional()
    firstName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    lastName?: string;
}
