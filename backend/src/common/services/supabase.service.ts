import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private supabase: SupabaseClient;
  private isConnected = false;

  constructor(private configService: ConfigService) {
    this.initializeSupabase();
  }

  private async initializeSupabase() {
    try {
      const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
      const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');

      if (!supabaseUrl || !supabaseKey) {
        this.logger.warn('⚠️ Credenciais do Supabase não encontradas');
        return;
      }

      this.logger.log('🔌 Inicializando cliente Supabase...');
      this.logger.log(`🌐 URL: ${supabaseUrl}`);

      this.supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: false,
        },
        db: {
          schema: 'public',
        },
      });

      // Testar conexão
      await this.testConnection();
      
    } catch (error) {
      this.logger.error('❌ Erro ao inicializar Supabase:', error.message);
    }
  }

  private async testConnection() {
    try {
      this.logger.log('🧪 Testando conexão com Supabase...');
      
      // Testar com uma query simples
      const { data, error } = await this.supabase
        .from('users')
        .select('count')
        .limit(1);

      if (error) {
        this.logger.warn('⚠️ Erro na query de teste:', error.message);
        // Tentar criar tabela se não existir
        await this.createTablesIfNotExist();
      } else {
        this.logger.log('✅ Conexão com Supabase estabelecida!');
        this.isConnected = true;
      }
    } catch (error) {
      this.logger.error('❌ Erro no teste de conexão:', error.message);
    }
  }

  private async createTablesIfNotExist() {
    try {
      this.logger.log('🔧 Criando tabelas no Supabase...');

      // Criar tabela users
      const { error: usersError } = await this.supabase.rpc('create_users_table');
      if (usersError && !usersError.message.includes('already exists')) {
        this.logger.warn('⚠️ Erro ao criar tabela users:', usersError.message);
      }

      // Criar tabela stories
      const { error: storiesError } = await this.supabase.rpc('create_stories_table');
      if (storiesError && !storiesError.message.includes('already exists')) {
        this.logger.warn('⚠️ Erro ao criar tabela stories:', storiesError.message);
      }

      // Criar tabela books
      const { error: booksError } = await this.supabase.rpc('create_books_table');
      if (booksError && !booksError.message.includes('already exists')) {
        this.logger.warn('⚠️ Erro ao criar tabela books:', booksError.message);
      }

      this.logger.log('✅ Tabelas verificadas/criadas no Supabase');
      this.isConnected = true;
      
    } catch (error) {
      this.logger.error('❌ Erro ao criar tabelas:', error.message);
    }
  }

  // Métodos para autenticação
  async signUp(email: string, password: string, userData: any) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        this.logger.error('❌ Erro no signup:', error.message);
        throw error;
      }

      this.logger.log(`✅ Usuário criado: ${email}`);
      return data;
    } catch (error) {
      this.logger.error('❌ Erro no signUp:', error.message);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        this.logger.error('❌ Erro no signin:', error.message);
        throw error;
      }

      this.logger.log(`✅ Login realizado: ${email}`);
      return data;
    } catch (error) {
      this.logger.error('❌ Erro no signIn:', error.message);
      throw error;
    }
  }

  // Métodos para dados
  async insertUser(userData: any) {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .insert(userData)
        .select()
        .single();

      if (error) {
        this.logger.error('❌ Erro ao inserir usuário:', error.message);
        throw error;
      }

      this.logger.log(`✅ Usuário inserido no banco: ${userData.email}`);
      return data;
    } catch (error) {
      this.logger.error('❌ Erro no insertUser:', error.message);
      throw error;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        this.logger.error('❌ Erro ao buscar usuário:', error.message);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('❌ Erro no findUserByEmail:', error.message);
      throw error;
    }
  }

  async insertBook(bookData: any) {
    try {
      const { data, error } = await this.supabase
        .from('books')
        .insert(bookData)
        .select()
        .single();

      if (error) {
        this.logger.error('❌ Erro ao inserir livro:', error.message);
        throw error;
      }

      this.logger.log(`✅ Livro inserido: ${bookData.title}`);
      return data;
    } catch (error) {
      this.logger.error('❌ Erro no insertBook:', error.message);
      throw error;
    }
  }

  async findBooksByUser(userEmail: string) {
    try {
      const { data, error } = await this.supabase
        .from('books')
        .select('*')
        .eq('userEmail', userEmail);

      if (error) {
        this.logger.error('❌ Erro ao buscar livros:', error.message);
        throw error;
      }

      return data || [];
    } catch (error) {
      this.logger.error('❌ Erro no findBooksByUser:', error.message);
      throw error;
    }
  }

  async getStories() {
    try {
      const { data, error } = await this.supabase
        .from('stories')
        .select('*');

      if (error) {
        this.logger.error('❌ Erro ao buscar histórias:', error.message);
        throw error;
      }

      return data || [];
    } catch (error) {
      this.logger.error('❌ Erro no getStories:', error.message);
      throw error;
    }
  }

  // Getters
  getClient(): SupabaseClient {
    return this.supabase;
  }

  isSupabaseConnected(): boolean {
    return this.isConnected;
  }
}

