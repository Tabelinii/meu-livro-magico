import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome de usuário único',
    example: 'joao123',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Email único do usuário',
    example: 'joao@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'João',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'Silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}

