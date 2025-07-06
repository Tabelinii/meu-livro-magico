import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private configService: ConfigService) {
    // Desabilitar Replicate temporariamente para focar no Supabase
    this.logger.warn('⚠️ Replicate desabilitado temporariamente - focando no Supabase');
  }

  async generateImage(prompt: string): Promise<string> {
    this.logger.log(`🎨 Solicitação de geração de imagem: ${prompt}`);
    
    // Retornar URL de placeholder por enquanto
    return 'https://via.placeholder.com/512x512/FFB6C1/000000?text=Imagem+Placeholder';
  }

  async generateBookCover(title: string, childName: string): Promise<string> {
    this.logger.log(`📖 Gerando capa para: ${title} - ${childName}`);
    
    // Retornar placeholder de capa
    return 'https://via.placeholder.com/512x512/4A90E2/FFFFFF?text=Capa+do+Livro';
  }

  async generateStoryImage(prompt: string): Promise<string> {
    this.logger.log(`🎨 Gerando imagem da história: ${prompt}`);
    
    // Retornar placeholder
    return 'https://via.placeholder.com/512x512/FFB6C1/000000?text=Imagem+Historia';
  }

  async generateStoryImages(
    storyPages: any[],
    childName: string,
  ): Promise<string[]> {
    this.logger.log(`📚 Gerando imagens para história de ${childName}`);
    
    // Retornar placeholders por enquanto
    return storyPages.map((_, index) => 
      `https://via.placeholder.com/512x512/FFB6C1/000000?text=Pagina+${index + 1}`
    );
  }
}

