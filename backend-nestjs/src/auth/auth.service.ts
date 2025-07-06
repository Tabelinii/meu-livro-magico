import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SupabaseService } from '../common/services/supabase.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      this.logger.log(`🔐 Tentativa de login: ${loginDto.email}`);

      // Tentar usar Supabase primeiro
      if (this.supabaseService.isSupabaseConnected()) {
        return await this.loginWithSupabase(loginDto);
      }

      // Fallback para TypeORM
      return await this.loginWithTypeORM(loginDto);
      
    } catch (error) {
      this.logger.error(`❌ Erro no login: ${error.message}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      this.logger.log(`📝 Tentativa de registro: ${createUserDto.email}`);

      // Tentar usar Supabase primeiro
      if (this.supabaseService.isSupabaseConnected()) {
        return await this.registerWithSupabase(createUserDto);
      }

      // Fallback para TypeORM
      return await this.registerWithTypeORM(createUserDto);
      
    } catch (error) {
      this.logger.error(`❌ Erro no registro: ${error.message}`);
      throw error;
    }
  }

  // Métodos Supabase
  private async loginWithSupabase(loginDto: LoginDto) {
    this.logger.log('🔌 Usando Supabase para login');

    // Buscar usuário no banco
    const user = await this.supabaseService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gerar JWT
    const payload = { 
      sub: user.id, 
      email: user.email, 
      username: user.username 
    };
    
    const access_token = this.jwtService.sign(payload);

    this.logger.log(`✅ Login Supabase bem-sucedido: ${loginDto.email}`);
    
    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  private async registerWithSupabase(createUserDto: CreateUserDto) {
    this.logger.log('🔌 Usando Supabase para registro');

    // Verificar se usuário já existe
    const existingUser = await this.supabaseService.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Criar usuário no banco
    const userData = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      firstName: createUserDto.firstName || '',
      lastName: createUserDto.lastName || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const user = await this.supabaseService.insertUser(userData);

    // Gerar JWT
    const payload = { 
      sub: user.id, 
      email: user.email, 
      username: user.username 
    };
    
    const access_token = this.jwtService.sign(payload);

    this.logger.log(`✅ Registro Supabase bem-sucedido: ${createUserDto.email}`);
    
    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  // Métodos TypeORM (fallback)
  private async loginWithTypeORM(loginDto: LoginDto) {
    this.logger.log('🗄️ Usando TypeORM para login');

    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      user,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      username: user.username 
    };
    
    const access_token = this.jwtService.sign(payload);

    this.logger.log(`✅ Login TypeORM bem-sucedido: ${loginDto.email}`);
    
    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  private async registerWithTypeORM(createUserDto: CreateUserDto) {
    this.logger.log('🗄️ Usando TypeORM para registro');

    const user = await this.usersService.create(createUserDto);

    const payload = { 
      sub: user.id, 
      email: user.email, 
      username: user.username 
    };
    
    const access_token = this.jwtService.sign(payload);

    this.logger.log(`✅ Registro TypeORM bem-sucedido: ${createUserDto.email}`);
    
    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async validateUser(payload: any): Promise<User> {
    try {
      // Tentar usar Supabase primeiro
      if (this.supabaseService.isSupabaseConnected()) {
        const user = await this.supabaseService.findUserByEmail(payload.email);
        if (user) {
          return user as User;
        }
      }

      // Fallback para TypeORM
      return await this.usersService.findByEmail(payload.email);
      
    } catch (error) {
      this.logger.error(`❌ Erro na validação: ${error.message}`);
      throw new UnauthorizedException('Token inválido');
    }
  }
}

