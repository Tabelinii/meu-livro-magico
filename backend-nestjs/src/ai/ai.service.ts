import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Replicate from 'replicate';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private replicate: Replicate;

  constructor(private configService: ConfigService) {
    const apiToken = this.configService.get('REPLICATE_API_TOKEN');
    if (apiToken) {
      this.replicate = new Replicate({
        auth: apiToken,
      });
    } else {
      this.logger.warn('REPLICATE_API_TOKEN não configurado. Serviço de IA desabilitado.');
    }
  }

  async generateImage(prompt: string, style: string = 'disney-pixar'): Promise<string | null> {
    if (!this.replicate) {
      this.logger.warn('Replicate não configurado. Retornando imagem placeholder.');
      return this.getPlaceholderImage();
    }

    try {
      this.logger.log(`Gerando imagem com prompt: ${prompt}`);

      // Melhorar o prompt com estilo Disney/Pixar
      const enhancedPrompt = this.enhancePrompt(prompt, style);

      const output = await this.replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: enhancedPrompt,
            negative_prompt: "ugly, blurry, poor quality, distorted, deformed, scary, dark, violent, inappropriate",
            width: 1024,
            height: 1024,
            num_outputs: 1,
            scheduler: "K_EULER",
            num_inference_steps: 30,
            guidance_scale: 7.5,
            seed: Math.floor(Math.random() * 1000000),
          }
        }
      );

      if (Array.isArray(output) && output.length > 0) {
        this.logger.log('Imagem gerada com sucesso');
        return output[0] as string;
      }

      this.logger.warn('Nenhuma imagem retornada pela API');
      return this.getPlaceholderImage();

    } catch (error) {
      this.logger.error('Erro ao gerar imagem:', error);
      return this.getPlaceholderImage();
    }
  }

  async generateBookCover(
    childName: string,
    storyTitle: string,
    category: string,
    gender: string = 'unissex'
  ): Promise<string | null> {
    const prompt = this.createCoverPrompt(childName, storyTitle, category, gender);
    return this.generateImage(prompt, 'disney-pixar-cover');
  }

  async generateStoryImage(
    pageContent: string,
    childName: string,
    storyContext: string
  ): Promise<string | null> {
    const prompt = this.createStoryImagePrompt(pageContent, childName, storyContext);
    return this.generateImage(prompt, 'disney-pixar-story');
  }

  private enhancePrompt(prompt: string, style: string): string {
    const stylePrompts = {
      'disney-pixar': 'Disney Pixar 3D animation style, colorful, warm lighting, child-friendly, magical atmosphere',
      'disney-pixar-cover': 'Disney Pixar movie poster style, vibrant colors, magical elements, book cover design, title space',
      'disney-pixar-story': 'Disney Pixar storybook illustration, warm and inviting, detailed background, expressive characters',
    };

    const baseStyle = stylePrompts[style] || stylePrompts['disney-pixar'];
    
    return `${prompt}, ${baseStyle}, high quality, detailed, professional illustration, safe for children`;
  }

  private createCoverPrompt(
    childName: string,
    storyTitle: string,
    category: string,
    gender: string
  ): string {
    const genderHints = {
      'menino': 'young boy with short hair',
      'menina': 'young girl with long hair',
      'unissex': 'young child',
    };

    const categoryHints = {
      'desenvolvimento_infantil': 'educational toys, books, learning environment',
      'super_heroi': 'superhero cape, heroic pose, city background',
      'princesa': 'princess dress, castle, magical kingdom',
      'aventura': 'adventure gear, map, treasure, exploration',
      'profissoes': 'professional uniform, workplace setting',
      'dinossauro': 'friendly dinosaurs, prehistoric landscape',
      'espaco': 'space suit, rockets, planets, stars',
      'amigo_leao': 'friendly lion, savanna, friendship',
      'bailarina': 'ballet dress, dance studio, graceful pose',
      'fada': 'fairy wings, magical forest, sparkles',
      'veterinaria': 'animals, veterinary clinic, caring scene',
      'unicornio': 'unicorn, rainbow, magical meadow',
      'sereia': 'mermaid tail, underwater kingdom, sea creatures',
    };

    const childDescription = genderHints[gender] || genderHints['unissex'];
    const categoryElements = categoryHints[category] || 'magical adventure';

    return `Book cover featuring ${childDescription} named ${childName}, ${categoryElements}, title "${storyTitle}" prominently displayed, magical border, enchanting atmosphere`;
  }

  private createStoryImagePrompt(
    pageContent: string,
    childName: string,
    storyContext: string
  ): string {
    // Extrair elementos-chave do conteúdo da página
    const cleanContent = pageContent.replace(/{nome}/g, childName);
    
    return `Storybook illustration: ${cleanContent}, featuring ${childName}, ${storyContext}, magical and whimsical scene`;
  }

  private getPlaceholderImage(): string {
    // Retorna URL de uma imagem placeholder
    return 'https://via.placeholder.com/1024x1024/FFB6C1/FFFFFF?text=Meu+Livro+Magico';
  }

  async testConnection(): Promise<boolean> {
    if (!this.replicate) {
      return false;
    }

    try {
      // Teste simples para verificar se a API está funcionando
      await this.replicate.models.list();
      return true;
    } catch (error) {
      this.logger.error('Erro ao testar conexão com Replicate:', error);
      return false;
    }
  }
}

