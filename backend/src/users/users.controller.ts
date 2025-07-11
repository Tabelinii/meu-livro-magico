import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({
        status: 200,
        description: 'Lista de usuários retornada com sucesso',
        type: [User],
    })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Buscar usuário por ID' })
    @ApiResponse({
        status: 200,
        description: 'Usuário encontrado',
        type: User,
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualizar usuário' })
    @ApiResponse({
        status: 200,
        description: 'Usuário atualizado com sucesso',
        type: User,
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'Conflito -  Email já existe',
    })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Deletar usuário' })
    @ApiResponse({
        status: 200,
        description: 'Usuário deletado com sucesso',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        await this.usersService.remove(id);
        return { message: 'Usuário deletado com sucesso' };
    }
}
