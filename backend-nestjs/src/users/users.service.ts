import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar se username já existe
    const existingUsername = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUsername) {
      throw new ConflictException('Nome de usuário já existe');
    }

    // Verificar se email já existe
    const existingEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email já está em uso');
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Criar usuário
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['books'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Se está atualizando a senha, fazer hash
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    // Verificar conflitos de username
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUsername = await this.usersRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (existingUsername) {
        throw new ConflictException('Nome de usuário já existe');
      }
    }

    // Verificar conflitos de email
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingEmail) {
        throw new ConflictException('Email já está em uso');
      }
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}

