import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface BookPage {
  title: string;
  text: string;
  imageUrl?: string;
}

export interface BookData {
  title: string;
  childName: string;
  childAge: string;
  pages: BookPage[];
  coverImageUrl?: string;
}

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  constructor(private configService: ConfigService) {}

  async generateBookPdf(bookData: BookData): Promise<Buffer> {
    this.logger.log(`Gerando PDF para: ${bookData.title}`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      
      // Configurar viewport para melhor qualidade
      await page.setViewport({ width: 1200, height: 1600 });

      // Gerar HTML do livro
      const html = await this.generateBookHtml(bookData);
      
      // Definir conteúdo HTML
      await page.setContent(html, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Gerar PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
        displayHeaderFooter: false,
      });

      this.logger.log('PDF gerado com sucesso');
      return Buffer.from(pdfBuffer);

    } catch (error) {
      this.logger.error('Erro ao gerar PDF:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  private async generateBookHtml(bookData: BookData): Promise<string> {
    const css = await this.getBookStyles();
    
    const coverPage = this.generateCoverPage(bookData);
    const contentPages = bookData.pages.map((page, index) => 
      this.generateContentPage(page, index + 1, bookData.childName)
    ).join('');

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${bookData.title}</title>
        <style>${css}</style>
      </head>
      <body>
        ${coverPage}
        ${contentPages}
      </body>
      </html>
    `;
  }

  private generateCoverPage(bookData: BookData): string {
    return `
      <div class="page cover-page">
        <div class="cover-content">
          ${bookData.coverImageUrl ? `
            <div class="cover-image">
              <img src="${bookData.coverImageUrl}" alt="Capa do livro" />
            </div>
          ` : ''}
          <h1 class="book-title">${bookData.title}</h1>
          <h2 class="child-name">Uma aventura de ${bookData.childName}</h2>
          <div class="age-badge">${bookData.childAge} anos</div>
          <div class="magic-elements">
            <div class="star">⭐</div>
            <div class="star">✨</div>
            <div class="star">🌟</div>
          </div>
          <div class="footer">
            <p>Criado com amor pelo Meu Livro Mágico</p>
          </div>
        </div>
      </div>
    `;
  }

  private generateContentPage(page: BookPage, pageNumber: number, childName: string): string {
    return `
      <div class="page content-page">
        <div class="page-header">
          <span class="page-number">Página ${pageNumber}</span>
        </div>
        
        <div class="page-content">
          <h2 class="page-title">${page.title}</h2>
          
          ${page.imageUrl ? `
            <div class="page-image">
              <img src="${page.imageUrl}" alt="Ilustração da página ${pageNumber}" />
            </div>
          ` : ''}
          
          <div class="page-text">
            <p>${page.text}</p>
          </div>
        </div>
        
        <div class="page-footer">
          <div class="magic-border"></div>
        </div>
      </div>
    `;
  }

  private async getBookStyles(): Promise<string> {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Comic Sans MS', cursive, sans-serif;
        line-height: 1.6;
        color: #333;
      }

      .page {
        width: 210mm;
        height: 297mm;
        page-break-after: always;
        position: relative;
        overflow: hidden;
      }

      .page:last-child {
        page-break-after: avoid;
      }

      /* Capa */
      .cover-page {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
      }

      .cover-content {
        padding: 40px;
        max-width: 80%;
      }

      .cover-image {
        margin-bottom: 30px;
      }

      .cover-image img {
        max-width: 300px;
        max-height: 300px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      }

      .book-title {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        line-height: 1.2;
      }

      .child-name {
        font-size: 32px;
        margin-bottom: 20px;
        color: #FFD700;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      }

      .age-badge {
        background: #FFD700;
        color: #333;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 24px;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 30px;
      }

      .magic-elements {
        margin: 30px 0;
      }

      .star {
        font-size: 40px;
        margin: 0 10px;
        display: inline-block;
        animation: twinkle 2s infinite;
      }

      @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .footer {
        margin-top: 40px;
        font-size: 18px;
        opacity: 0.9;
      }

      /* Páginas de conteúdo */
      .content-page {
        background: linear-gradient(to bottom, #ffeaa7, #fab1a0);
        padding: 40px;
      }

      .page-header {
        text-align: right;
        margin-bottom: 30px;
      }

      .page-number {
        background: #6c5ce7;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 16px;
        font-weight: bold;
      }

      .page-title {
        font-size: 36px;
        color: #2d3436;
        text-align: center;
        margin-bottom: 30px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
      }

      .page-image {
        text-align: center;
        margin: 30px 0;
      }

      .page-image img {
        max-width: 100%;
        max-height: 400px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }

      .page-text {
        font-size: 24px;
        line-height: 1.8;
        text-align: justify;
        background: rgba(255,255,255,0.8);
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        margin: 30px 0;
      }

      .page-footer {
        position: absolute;
        bottom: 20px;
        left: 20px;
        right: 20px;
      }

      .magic-border {
        height: 4px;
        background: linear-gradient(to right, #6c5ce7, #a29bfe, #fd79a8, #fdcb6e);
        border-radius: 2px;
      }

      /* Responsividade para impressão */
      @media print {
        .page {
          margin: 0;
          box-shadow: none;
        }
      }
    `;
  }

  async savePdfToFile(pdfBuffer: Buffer, filename: string): Promise<string> {
    const uploadsDir = this.configService.get('UPLOADS_DIR', './uploads');
    const pdfDir = path.join(uploadsDir, 'pdfs');
    
    // Criar diretório se não existir
    await fs.mkdir(pdfDir, { recursive: true });
    
    const filePath = path.join(pdfDir, filename);
    await fs.writeFile(filePath, pdfBuffer);
    
    this.logger.log(`PDF salvo em: ${filePath}`);
    return filePath;
  }

  async generatePreviewImages(bookData: BookData): Promise<string[]> {
    this.logger.log('Gerando imagens de preview do livro');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const previewImages: string[] = [];

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 800, height: 1000 });

      // Gerar preview da capa
      const coverHtml = this.generatePreviewHtml(this.generateCoverPage(bookData));
      await page.setContent(coverHtml, { waitUntil: 'networkidle0' });
      
      const coverImage = await page.screenshot({ 
        type: 'png',
        fullPage: true,
        encoding: 'base64'
      });
      previewImages.push(`data:image/png;base64,${coverImage}`);

      // Gerar preview de algumas páginas (máximo 3)
      const pagesToPreview = bookData.pages.slice(0, 3);
      for (let i = 0; i < pagesToPreview.length; i++) {
        const pageHtml = this.generatePreviewHtml(
          this.generateContentPage(pagesToPreview[i], i + 1, bookData.childName)
        );
        await page.setContent(pageHtml, { waitUntil: 'networkidle0' });
        
        const pageImage = await page.screenshot({ 
          type: 'png',
          fullPage: true,
          encoding: 'base64'
        });
        previewImages.push(`data:image/png;base64,${pageImage}`);
      }

      return previewImages;

    } catch (error) {
      this.logger.error('Erro ao gerar imagens de preview:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  private generatePreviewHtml(pageContent: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${this.getBookStyles()}</style>
      </head>
      <body>
        ${pageContent}
      </body>
      </html>
    `;
  }
}

