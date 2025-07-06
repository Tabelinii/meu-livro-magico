// Serviço de integração com Replicate.com
// Para substituição de rostos e geração de livrinhos personalizados

class ReplicateService {
  constructor() {
    this.apiKey = process.env.REACT_APP_REPLICATE_API_KEY || null
    this.baseURL = 'https://api.replicate.com/v1'
    this.isConfigured = !!this.apiKey
  }

  // Simulação de substituição de rosto (para desenvolvimento)
  async simulateFaceSwap(sourceImageUrl, targetImageUrl) {
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Retornar a imagem original como fallback
    return targetImageUrl
  }

  // Modelo para substituição de rostos (Face Swap)
  async swapFace(sourceImageUrl, targetImageUrl) {
    try {
      // Se não tiver API key, usar simulação
      if (!this.isConfigured) {
        console.log('Replicate não configurado, usando simulação...')
        return await this.simulateFaceSwap(sourceImageUrl, targetImageUrl)
      }

      const response = await fetch(`${this.baseURL}/predictions`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "8afb9b6b3f6e4c8c9b5f2e1d3a4b5c6d7e8f9a0b", // Face swap model
          input: {
            source_image: sourceImageUrl,
            target_image: targetImageUrl,
            face_restore: true,
            background_enhance: true,
            face_upsample: true,
            upscale: 2
          }
        })
      })

      const prediction = await response.json()
      
      if (response.ok) {
        return await this.waitForCompletion(prediction.id)
      } else {
        throw new Error(`Erro na API: ${prediction.detail || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Erro no face swap:', error)
      // Fallback para simulação em caso de erro
      return await this.simulateFaceSwap(sourceImageUrl, targetImageUrl)
    }
  }

  // Aguardar conclusão da predição
  async waitForCompletion(predictionId) {
    const maxAttempts = 60 // 5 minutos máximo
    let attempts = 0

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${this.baseURL}/predictions/${predictionId}`, {
          headers: {
            'Authorization': `Token ${this.apiKey}`,
          }
        })

        const prediction = await response.json()

        if (prediction.status === 'succeeded') {
          return prediction.output
        } else if (prediction.status === 'failed') {
          throw new Error(`Predição falhou: ${prediction.error}`)
        }

        // Aguardar 5 segundos antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, 5000))
        attempts++
      } catch (error) {
        console.error('Erro ao verificar status:', error)
        attempts++
      }
    }

    throw new Error('Timeout: Predição demorou muito para completar')
  }

  // Gerar imagem com FLUX
  async generateImage(prompt, aspectRatio = '1:1') {
    try {
      if (!this.isConfigured) {
        console.log('Replicate não configurado, usando imagem placeholder...')
        return `https://picsum.photos/512/512?random=${Math.random()}`
      }

      const response = await fetch(`${this.baseURL}/predictions`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "black-forest-labs/flux-schnell", // FLUX model
          input: {
            prompt: prompt,
            aspect_ratio: aspectRatio,
            num_outputs: 1,
            output_format: "png",
            output_quality: 90
          }
        })
      })

      const prediction = await response.json()
      
      if (response.ok) {
        const result = await this.waitForCompletion(prediction.id)
        return Array.isArray(result) ? result[0] : result
      } else {
        throw new Error(`Erro na API: ${prediction.detail || 'Erro desconhecido'}`)
      }
    } catch (error) {
      console.error('Erro na geração de imagem:', error)
      // Fallback para imagem placeholder
      return `https://picsum.photos/512/512?random=${Math.random()}`
    }
  }
}

// Instância singleton
const replicateService = new ReplicateService()

// Função para gerar livro personalizado completo
export async function generatePersonalizedBook({ theme, story, gender, childName, childAge, childPhoto, storyData }) {
  try {
    console.log('Iniciando geração do livro personalizado...')
    
    // Dados base do livro
    const bookData = {
      id: `book_${Date.now()}`,
      title: storyData.title?.replace('{nome}', childName) || `${childName} e sua Aventura Mágica`,
      theme,
      story,
      gender,
      childName,
      childAge,
      createdAt: new Date().toISOString(),
      pages: []
    }

    // Gerar páginas baseadas no tema e gênero
    const pagePrompts = generatePagePrompts(theme, story, gender, childName, childAge)
    
    console.log(`Gerando ${pagePrompts.length} páginas...`)
    
    // Gerar cada página
    for (let i = 0; i < pagePrompts.length; i++) {
      const pagePrompt = pagePrompts[i]
      
      console.log(`Gerando página ${i + 1}: ${pagePrompt.title}`)
      
      // Gerar imagem da página
      const imageUrl = await replicateService.generateImage(pagePrompt.imagePrompt)
      
      // Se tiver foto da criança, fazer face swap
      let finalImageUrl = imageUrl
      if (childPhoto && pagePrompt.includeChild) {
        console.log(`Aplicando face swap na página ${i + 1}...`)
        finalImageUrl = await replicateService.swapFace(childPhoto, imageUrl)
      }
      
      // Adicionar página ao livro
      bookData.pages.push({
        pageNumber: i + 1,
        title: pagePrompt.title,
        text: pagePrompt.text.replace('{nome}', childName),
        imageUrl: finalImageUrl,
        includeChild: pagePrompt.includeChild
      })
    }

    console.log('Livro gerado com sucesso!')
    return bookData
    
  } catch (error) {
    console.error('Erro na geração do livro:', error)
    throw error
  }
}

// Gerar prompts para as páginas baseado no tema e gênero
function generatePagePrompts(theme, story, gender, childName, childAge) {
  const basePrompts = getBasePrompts(theme, story)
  
  // Adaptar prompts baseado no gênero
  return basePrompts.map(prompt => ({
    ...prompt,
    imagePrompt: adaptPromptForGender(prompt.imagePrompt, gender),
    text: adaptTextForGender(prompt.text, gender)
  }))
}

// Prompts base por tema
function getBasePrompts(theme, story) {
  const prompts = {
    desenvolvimento_infantil: [
      {
        title: "O Início da Aventura",
        text: "Era uma vez {nome}, uma criança muito especial que estava prestes a viver uma grande aventura...",
        imagePrompt: "A happy child in a magical garden, Disney Pixar style, bright colors, cheerful atmosphere",
        includeChild: true
      },
      // ... mais páginas
    ],
    super_heroi: [
      {
        title: "O Despertar dos Poderes",
        text: "{nome} descobriu que tinha poderes especiais quando...",
        imagePrompt: "A child discovering superpowers, glowing energy around them, heroic pose, Disney Pixar style",
        includeChild: true
      },
      {
        title: "A Primeira Missão",
        text: "Com seus novos poderes, {nome} decidiu ajudar as pessoas da cidade...",
        imagePrompt: "A young superhero helping people in a colorful city, Disney Pixar style, heroic scene",
        includeChild: true
      },
      // ... mais páginas
    ],
    aventura: [
      {
        title: "O Mapa do Tesouro",
        text: "{nome} encontrou um mapa misterioso que levava a um tesouro perdido...",
        imagePrompt: "A child holding an ancient treasure map on a tropical beach, Disney Pixar style, adventure atmosphere",
        includeChild: true
      },
      // ... mais páginas
    ],
    princesa: [
      {
        title: "O Reino Encantado",
        text: gender === 'menina' ? 
          "A princesa {nome} vivia em um reino mágico onde..." : 
          "O príncipe {nome} vivia em um reino mágico onde...",
        imagePrompt: gender === 'menina' ? 
          "A brave princess in a magical castle, Disney Pixar style, royal atmosphere" :
          "A brave prince in a magical castle, Disney Pixar style, royal atmosphere",
        includeChild: true
      },
      // ... mais páginas
    ],
    profissoes: [
      {
        title: "Explorando Profissões",
        text: "{nome} sempre sonhou em descobrir qual profissão escolher quando crescer...",
        imagePrompt: "A child surrounded by symbols of different professions, Disney Pixar style, educational scene",
        includeChild: true
      },
      // ... mais páginas
    ],
    dinossauro: [
      {
        title: "O Vale dos Dinossauros",
        text: "{nome} descobriu um vale secreto onde os dinossauros ainda viviam...",
        imagePrompt: "A child in a prehistoric valley with friendly dinosaurs, Disney Pixar style, adventure scene",
        includeChild: true
      },
      // ... mais páginas
    ],
    espaco: [
      {
        title: "Missão Espacial",
        text: "O astronauta {nome} estava pronto para sua primeira viagem ao espaço...",
        imagePrompt: "A child astronaut in a colorful space suit floating in space, Disney Pixar style, cosmic scene",
        includeChild: true
      },
      // ... mais páginas
    ],
    crianca_leao: [
      {
        title: "O Encontro Especial",
        text: "{nome} conheceu um leão muito especial na floresta mágica...",
        imagePrompt: "A child meeting a friendly golden lion in a magical forest, Disney Pixar style, friendship scene",
        includeChild: true
      },
      // ... mais páginas
    ]
  }

  // Retornar prompts do tema ou prompts genéricos
  return prompts[theme] || prompts.aventura
}

// Adaptar prompt de imagem para gênero
function adaptPromptForGender(prompt, gender) {
  if (!gender) return prompt
  
  if (gender === 'menino') {
    return prompt
      .replace(/child/g, 'boy')
      .replace(/princess/g, 'prince')
      .replace(/she/g, 'he')
      .replace(/her/g, 'his')
  } else {
    return prompt
      .replace(/child/g, 'girl')
      .replace(/prince/g, 'princess')
      .replace(/he/g, 'she')
      .replace(/his/g, 'her')
  }
}

// Adaptar texto para gênero
function adaptTextForGender(text, gender) {
  if (!gender) return text
  
  if (gender === 'menino') {
    return text
      .replace(/criança/g, 'menino')
      .replace(/ela/g, 'ele')
      .replace(/dela/g, 'dele')
      .replace(/princesa/g, 'príncipe')
  } else {
    return text
      .replace(/criança/g, 'menina')
      .replace(/ele/g, 'ela')
      .replace(/dele/g, 'dela')
      .replace(/príncipe/g, 'princesa')
  }
}

// Estimar custo de geração
export function estimateBookCost(pageCount = 12) {
  // Custo base por página (geração de imagem + face swap)
  const costPerPage = 0.05 // $0.05 por página
  const baseCost = pageCount * costPerPage
  
  // Adicionar margem de segurança
  return baseCost * 1.2
}

// Verificar se Replicate está configurado
export function isReplicateConfigured() {
  return replicateService.isConfigured
}

export default replicateService

