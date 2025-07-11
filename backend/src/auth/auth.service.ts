import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../common/services/supabase.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserPublicDto } from '../users/dto/user-public.dto';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly jwtService: JwtService, private readonly supabaseService: SupabaseService) {}

    async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
        this.logger.log(`📝 Registrando usuário: ${createUserDto.email}`);

        // 1. Criar no Supabase Auth
        const { data, error } = await this.supabaseService.getClient().auth.signUp({
            email: createUserDto.email,
            password: createUserDto.password,
            options: {
                data: {
                    phone: createUserDto.phone,
                    firstName: createUserDto.firstName || '',
                    lastName: createUserDto.lastName || '',
                },
            },
        });

        if (error || !data.user) {
            this.logger.error(`❌ Erro ao registrar no Supabase Auth: ${error?.message}`);
            throw new UnauthorizedException(error?.message || 'Erro ao registrar');
        }

        const authUser = data.user;

        // 2. Criar entrada na tabela users
        const user = await this.supabaseService.insertUser({
            id: authUser.id,
            email: authUser.email,
            phone: createUserDto.phone,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
        });

        // 3. Gerar token
        const access_token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
        });

        this.logger.log(`✅ Registro bem-sucedido: ${user.email}`);

        return {
            access_token,
            user: new UserPublicDto(user),
        };
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        this.logger.log(`🔐 Tentativa de login: ${loginDto.email}`);

        const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
            email: loginDto.email,
            password: loginDto.password,
        });

        if (error || !data.user) {
            this.logger.error(`❌ Login falhou: ${error?.message}`);
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Buscar dados do banco (tabela `users`)
        const user = await this.supabaseService.findUserByEmail(data.user.email!);

        if (!user) {
            this.logger.error(`❌ Usuário não encontrado na tabela users`);
            throw new UnauthorizedException('Usuário não encontrado');
        }

        const access_token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });

        this.logger.log(`✅ Login bem-sucedido: ${user.email}`);

        return {
            access_token,
            user: new UserPublicDto(user),
        };
    }

    async generateToken(user: User) {
        console.log(user);
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return {
            accessToken: token,
            user,
        };
    }

    async validateUser(payload: any) {
        const user = await this.supabaseService.findUserByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException('Token inválido');
        }
        return user;
    }
}
