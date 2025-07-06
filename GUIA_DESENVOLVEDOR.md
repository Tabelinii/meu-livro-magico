# 👨‍💻 GUIA DO DESENVOLVEDOR - MEU LIVRO MÁGICO

## 🎯 **VISÃO GERAL TÉCNICA**

Este guia fornece todas as informações técnicas necessárias para um desenvolvedor continuar o projeto "Meu Livro Mágico".

## 🏗️ **ARQUITETURA DO SISTEMA**

### **Frontend (React)**
```
src/
├── components/
│   ├── Header.jsx           # Cabeçalho com navegação
│   ├── Footer.jsx           # Rodapé
│   ├── PhotoUpload.jsx      # Upload de fotos
│   └── pages/
│       ├── HomePage.jsx     # Página inicial
│       ├── CreateBookPage.jsx # Criação de livros
│       ├── PreviewPage.jsx  # Preview do livro
│       ├── GenerationPage.jsx # Geração com IA
│       ├── DownloadPage.jsx # Download do PDF
│       ├── PaymentPage.jsx  # Pagamento
│       ├── LoginPage.jsx    # Login/Cadastro
│       └── MyBooksPage.jsx  # Biblioteca pessoal
├── services/
│   ├── replicate.js         # Integração Replicate API
│   └── pdfService.js        # Comunicação com backend
└── data/
    └── stories.js           # Base de dados das histórias
```

### **Backend (Flask)**
```
src/
├── routes/
│   ├── user.py             # Rotas de usuário
│   └── pdf_basic.py        # Geração de PDFs
├── models/
│   └── user.py             # Modelo de usuário
└── static/                 # Frontend buildado + assets
```

## 🔧 **CONFIGURAÇÃO DE DESENVOLVIMENTO**

### **Variáveis de Ambiente**

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_REPLICATE_API_KEY=your_replicate_key_here
```

**Backend (.env):**
```env
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
REPLICATE_API_TOKEN=your_replicate_token_here
```

### **Scripts Úteis**

**Frontend:**
```bash
pnpm run dev          # Desenvolvimento
pnpm run build        # Build produção
pnpm run preview      # Preview do build
pnpm run lint         # Linting
```

**Backend:**
```bash
python src/main.py    # Servidor desenvolvimento
flask run             # Alternativa Flask
pip freeze > requirements.txt  # Atualizar deps
```

## 📡 **API ENDPOINTS**

### **Histórias**
```
GET /api/pdf/stories
Response: Lista de todas as histórias disponíveis
```

### **Geração de PDF**
```
POST /api/pdf/generate
Body: {
  "childName": "João",
  "childAge": "4",
  "storyId": "desfralde",
  "photoUrl": "base64_image_data"
}
Response: PDF file download
```

### **Preview de História**
```
POST /api/pdf/preview/{story_id}
Body: {
  "childName": "Maria",
  "childAge": "5"
}
Response: JSON com páginas da história personalizada
```

## 🎨 **SISTEMA DE TEMAS**

### **Estrutura de Tema**
```javascript
{
  id: "desenvolvimento_infantil",
  name: "Desenvolvimento Infantil",
  description: "Histórias que ajudam no crescimento",
  color: "purple",
  icon: "🌟",
  isNew: true,
  stories: [
    {
      id: "desfralde",
      title: "A Grande Aventura do Penico",
      description: "História sobre desfralde",
      ageRange: "2-4 anos",
      duration: "15 min",
      pedagogicalValue: "Autonomia e autoconfiança",
      fullStory: {
        page1: { text: "...", image: "..." },
        // ... mais páginas
      }
    }
  ]
}
```

### **Adicionando Nova História**

1. **Editar `src/data/stories.js`:**
```javascript
// Adicionar nova história ao tema existente
const novaHistoria = {
  id: "nova_historia",
  title: "Título da Nova História",
  description: "Descrição da história",
  ageRange: "3-6 anos",
  duration: "12 min",
  pedagogicalValue: "Valor educativo",
  fullStory: {
    page1: {
      text: "Era uma vez {nome}, uma criança de {idade} anos...",
      image: "ilustracao_pagina_1.png"
    }
    // ... adicionar todas as páginas
  }
}
```

2. **Criar ilustrações:**
- Salvar em `public/images/covers/`
- Formato PNG recomendado
- Resolução mínima: 800x600px

## 🤖 **INTEGRAÇÃO REPLICATE**

### **Configuração**
```javascript
// src/services/replicate.js
const REPLICATE_API_TOKEN = process.env.REACT_APP_REPLICATE_API_KEY

export const faceSwap = async (sourceImage, targetImage) => {
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: "face-swap-model-version",
      input: {
        source_image: sourceImage,
        target_image: targetImage
      }
    })
  })
  return response.json()
}
```

### **Modelos Recomendados**
- **Face Swap:** `lucataco/faceswap`
- **Image Generation:** `stability-ai/stable-diffusion`
- **Image Enhancement:** `tencentarc/gfpgan`

## 📄 **GERAÇÃO DE PDF**

### **Estrutura Atual (Texto)**
```python
# backend/src/routes/pdf_basic.py
def generate_pdf_content(story_data, child_name, child_age):
    content = f"# {story_data['title'].replace('{nome}', child_name)}\n\n"
    
    for page_key, page_data in story_data['fullStory'].items():
        text = page_data['text']
        text = text.replace('{nome}', child_name)
        text = text.replace('{idade}', str(child_age))
        content += f"{text}\n\n"
    
    return content
```

### **Upgrade para PDF Real (ReportLab)**
```python
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image
from reportlab.lib.styles import getSampleStyleSheet

def generate_real_pdf(story_data, child_name, child_age, output_path):
    doc = SimpleDocTemplate(output_path, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []
    
    # Adicionar título
    title = story_data['title'].replace('{nome}', child_name)
    story.append(Paragraph(title, styles['Title']))
    
    # Adicionar páginas com texto e imagens
    for page_key, page_data in story_data['fullStory'].items():
        # Texto personalizado
        text = page_data['text'].replace('{nome}', child_name)
        story.append(Paragraph(text, styles['Normal']))
        
        # Imagem se existir
        if 'image' in page_data:
            img_path = f"static/{page_data['image']}"
            if os.path.exists(img_path):
                story.append(Image(img_path, width=400, height=300))
    
    doc.build(story)
```

## 🎨 **CUSTOMIZAÇÃO DE DESIGN**

### **Cores Principais**
```css
:root {
  --purple-primary: #7c3aed;
  --purple-secondary: #a855f7;
  --pink-accent: #ec4899;
  --yellow-highlight: #fbbf24;
}
```

### **Componentes Tailwind**
```javascript
// Botão primário
className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"

// Card de história
className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"

// Input de formulário
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
```

## 🚀 **DEPLOY E PRODUÇÃO**

### **Vercel (Frontend)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### **Heroku (Backend)**
```bash
# Criar Procfile
echo "web: python src/main.py" > Procfile

# Deploy
heroku create meu-livro-magico-api
git push heroku main
```

### **Docker (Full Stack)**
```dockerfile
# Dockerfile
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY backend/ ./
COPY --from=frontend /app/frontend/dist ./src/static
EXPOSE 5000
CMD ["python", "src/main.py"]
```

## 🧪 **TESTES**

### **Frontend (Jest + React Testing Library)**
```javascript
// src/components/__tests__/Header.test.jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

test('renders header with logo', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
  expect(screen.getByText('Meu Livro Mágico')).toBeInTheDocument()
})
```

### **Backend (pytest)**
```python
# tests/test_pdf_generation.py
import pytest
from src.routes.pdf_basic import generate_pdf_content

def test_pdf_generation():
    story_data = {
        'title': 'História do {nome}',
        'fullStory': {
            'page1': {'text': 'Era uma vez {nome}, de {idade} anos...'}
        }
    }
    
    result = generate_pdf_content(story_data, 'João', 5)
    assert 'João' in result
    assert '5' in result
```

## 📊 **MONITORAMENTO**

### **Analytics Recomendados**
- **Google Analytics 4** - Comportamento do usuário
- **Hotjar** - Heatmaps e gravações
- **Sentry** - Monitoramento de erros

### **Métricas Importantes**
- Taxa de conversão (visitante → livro criado)
- Tempo médio de criação
- Histórias mais populares
- Taxa de abandono por etapa

## 🔒 **SEGURANÇA**

### **Frontend**
- Validação de inputs
- Sanitização de dados
- HTTPS obrigatório
- CSP headers

### **Backend**
- Rate limiting
- Validação de uploads
- Sanitização de dados
- CORS configurado

## 📈 **OTIMIZAÇÕES**

### **Performance**
- Lazy loading de componentes
- Compressão de imagens
- CDN para assets
- Cache de APIs

### **SEO**
- Meta tags dinâmicas
- Sitemap.xml
- Schema markup
- URLs amigáveis

---

## 🎯 **ROADMAP TÉCNICO**

### **Curto Prazo (1-2 meses)**
- [ ] Implementar PDF real com ReportLab
- [ ] Sistema de usuários completo
- [ ] Integração de pagamentos
- [ ] Testes automatizados

### **Médio Prazo (3-6 meses)**
- [ ] Dashboard administrativo
- [ ] Analytics avançados
- [ ] API mobile
- [ ] Múltiplos idiomas

### **Longo Prazo (6+ meses)**
- [ ] IA própria para geração
- [ ] Marketplace de histórias
- [ ] Impressão sob demanda
- [ ] Franquias regionais

**Este guia fornece toda a base técnica necessária para continuar o desenvolvimento do "Meu Livro Mágico" com qualidade profissional!**

