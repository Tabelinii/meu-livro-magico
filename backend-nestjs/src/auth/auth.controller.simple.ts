import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/auth')
export class AuthControllerSimple {
  
  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  async register(@Body() body: any) {
    return {
      message: 'Endpoint de registro funcionando!',
      data: body,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Fazer login' })
  async login(@Body() body: any) {
    return {
      message: 'Endpoint de login funcionando!',
      data: body,
    };
  }

  @Get('test')
  @ApiOperation({ summary: 'Teste de conectividade' })
  async test() {
    return {
      message: 'API de autenticação funcionando!',
      timestamp: new Date().toISOString(),
    };
  }
}

