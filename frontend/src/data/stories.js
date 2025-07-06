// Estrutura reorganizada por gênero com Desenvolvimento Infantil separado
export const genderSections = {
  menino: {
    id: 'menino',
    title: 'Para Meninos',
    subtitle: 'Aventuras épicas e histórias de coragem',
    emoji: '👦',
    color: 'from-blue-500 to-cyan-500',
    themes: [
      {
        id: 'desenvolvimento-menino',
        title: 'Desenvolvimento Infantil',
        emoji: '🌟',
        description: 'Histórias pedagógicas para desenvolvimento saudável',
        cover: '/capas/desenvolvimento.png',
        isNew: true,
        stories: [
          {
            id: 'desfralde-menino',
            title: 'A Grande Aventura do Penico',
            description: 'Uma jornada heroica rumo à independência',
            cover: '/capas_desenvolvimento/desfralde_menino.png',
            ageRange: '2-4 anos',
            pages: 12
          },
          {
            id: 'sono-menino',
            title: 'O Guardião dos Sonhos',
            description: 'Vencendo medos noturnos com coragem',
            cover: '/capas_desenvolvimento/sono_menino.png',
            ageRange: '3-6 anos',
            pages: 12
          },
          {
            id: 'amizade-menino',
            title: 'A Liga da Amizade',
            description: 'Fazendo amigos e trabalhando em equipe',
            cover: '/capas_desenvolvimento/amizade_menino.png',
            ageRange: '4-7 anos',
            pages: 12
          },
          {
            id: 'alimentacao-menino',
            title: 'O Pequeno Chef Saudável',
            description: 'Descobrindo o poder dos alimentos nutritivos',
            cover: '/capas_desenvolvimento/alimentacao_menino.png',
            ageRange: '3-6 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'super-heroi',
        title: 'Super-Herói',
        emoji: '🦸‍♂️',
        description: 'Aventuras épicas e poderes incríveis',
        cover: '/capas/super-heroi.png',
        adaptable: true,
        stories: [
          {
            id: 'super-heroi-1',
            title: 'O Despertar dos Poderes',
            description: 'Descobrindo poderes especiais e responsabilidades',
            cover: '/capas/super-heroi.png',
            ageRange: '4-8 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'aventura',
        title: 'Aventura',
        emoji: '🗺️',
        description: 'Exploração e descobertas emocionantes',
        cover: '/capas/aventura.png',
        adaptable: true,
        stories: [
          {
            id: 'aventura-1',
            title: 'A Ilha do Tesouro Perdido',
            description: 'Uma expedição em busca do tesouro mais valioso',
            cover: '/capas/aventura.png',
            ageRange: '5-9 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'profissoes',
        title: 'Profissões',
        emoji: '👨‍⚕️',
        description: 'Explorando o mundo do trabalho',
        cover: '/capas/profissoes.png',
        isNew: true,
        adaptable: true,
        stories: [
          {
            id: 'profissoes-1',
            title: 'O Dia das Profissões Mágicas',
            description: 'Descobrindo diferentes carreiras e seus segredos',
            cover: '/capas/profissoes.png',
            ageRange: '4-8 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'dinossauro',
        title: 'Dinossauro',
        emoji: '🦕',
        description: 'Era pré-histórica cheia de diversão',
        cover: '/capas/dinossauro.png',
        adaptable: true,
        stories: [
          {
            id: 'dinossauro-1',
            title: 'O Vale dos Dinossauros Amigos',
            description: 'Aventuras na era dos gigantes pré-históricos',
            cover: '/capas/dinossauro.png',
            ageRange: '4-8 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'espaco',
        title: 'Espaço',
        emoji: '🚀',
        description: 'Viagens intergalácticas fantásticas',
        cover: '/capas/espaco.png',
        adaptable: true,
        stories: [
          {
            id: 'espaco-1',
            title: 'A Missão Espacial Secreta',
            description: 'Explorando galáxias distantes e planetas misteriosos',
            cover: '/capas/espaco.png',
            ageRange: '5-9 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'amigo-leao',
        title: 'Meu Amigo Leão',
        emoji: '🦁',
        description: 'Amizade e coragem verdadeiras',
        cover: '/capas/crianca-leao.png',
        isNew: true,
        adaptable: true,
        stories: [
          {
            id: 'amigo-leao-1',
            title: 'O Leão Corajoso e Eu',
            description: 'Uma amizade especial que ensina sobre coragem',
            cover: '/capas/crianca-leao.png',
            ageRange: '4-7 anos',
            pages: 12
          }
        ]
      }
    ]
  },
  menina: {
    id: 'menina',
    title: 'Para Meninas',
    subtitle: 'Histórias mágicas e aventuras encantadoras',
    emoji: '👧',
    color: 'from-pink-500 to-purple-500',
    themes: [
      {
        id: 'desenvolvimento-menina',
        title: 'Desenvolvimento Infantil',
        emoji: '🌟',
        description: 'Histórias pedagógicas para desenvolvimento saudável',
        cover: '/capas/desenvolvimento_menina.png',
        isNew: true,
        stories: [
          {
            id: 'desfralde-menina',
            title: 'A Princesa do Penico Dourado',
            description: 'Uma jornada real rumo à independência',
            cover: '/capas_desenvolvimento/desfralde_menina.png',
            ageRange: '2-4 anos',
            pages: 12
          },
          {
            id: 'sono-menina',
            title: 'A Fada dos Sonhos Dourados',
            description: 'Vencendo medos noturnos com magia',
            cover: '/capas_desenvolvimento/sono_menina.png',
            ageRange: '3-6 anos',
            pages: 12
          },
          {
            id: 'amizade-menina',
            title: 'O Círculo das Amigas Especiais',
            description: 'Fazendo amigas e compartilhando momentos mágicos',
            cover: '/capas_desenvolvimento/amizade_menina.png',
            ageRange: '4-7 anos',
            pages: 12
          },
          {
            id: 'alimentacao-menina',
            title: 'A Pequena Chef das Cores',
            description: 'Descobrindo o arco-íris dos alimentos saudáveis',
            cover: '/capas_desenvolvimento/alimentacao_menina.png',
            ageRange: '3-6 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'princesa',
        title: 'Princesa',
        emoji: '👸',
        description: 'Contos de coragem e sabedoria real',
        cover: '/capas_femininas/princesa.png',
        stories: [
          {
            id: 'princesa-1',
            title: 'A Princesa Corajosa do Reino Encantado',
            description: 'Uma princesa que salva o reino com inteligência',
            cover: '/capas_femininas/princesa.png',
            ageRange: '4-8 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'bailarina',
        title: 'Bailarina',
        emoji: '🩰',
        description: 'O mundo mágico da dança e expressão',
        cover: '/capas_femininas/bailarina.png',
        stories: [
          {
            id: 'bailarina-1',
            title: 'A Bailarina das Estrelas',
            description: 'Dançando até as estrelas com graça e determinação',
            cover: '/capas_femininas/bailarina.png',
            ageRange: '4-8 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'fada',
        title: 'Fada',
        emoji: '🧚‍♀️',
        description: 'Aventuras mágicas no reino das fadas',
        cover: '/capas_femininas/fada.png',
        stories: [
          {
            id: 'fada-1',
            title: 'A Pequena Fada do Jardim Secreto',
            description: 'Protegendo a natureza com poderes mágicos',
            cover: '/capas_femininas/fada.png',
            ageRange: '4-7 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'veterinaria',
        title: 'Veterinária',
        emoji: '👩‍⚕️',
        description: 'Salvando e cuidando de animais especiais',
        cover: '/capas_femininas/veterinaria.png',
        stories: [
          {
            id: 'veterinaria-1',
            title: 'A Doutora dos Animais Mágicos',
            description: 'Curando bichinhos com amor e dedicação',
            cover: '/capas_femininas/veterinaria.png',
            ageRange: '5-8 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'unicornio',
        title: 'Unicórnio',
        emoji: '🦄',
        description: 'Aventuras mágicas com unicórnios',
        cover: '/capas_femininas/unicornio.png',
        stories: [
          {
            id: 'unicornio-1',
            title: 'A Menina e o Unicórnio do Arco-Íris',
            description: 'Uma amizade mágica que salva o reino das cores',
            cover: '/capas_femininas/unicornio.png',
            ageRange: '4-7 anos',
            pages: 12
          }
        ]
      },
      {
        id: 'sereia',
        title: 'Sereia',
        emoji: '🧜‍♀️',
        description: 'Aventuras no fundo do mar',
        cover: '/capas_femininas/sereia.png',
        stories: [
          {
            id: 'sereia-1',
            title: 'A Pequena Sereia Exploradora',
            description: 'Descobrindo tesouros e segredos do oceano',
            cover: '/capas_femininas/sereia.png',
            ageRange: '4-8 anos',
            pages: 12
          }
        ]
      }
    ]
  }
}

// Função para obter seção por gênero
export function getGenderSection(gender) {
  return genderSections[gender] || null
}

// Função para obter tema por ID e gênero
export function getThemeByIdAndGender(themeId, gender) {
  const section = getGenderSection(gender)
  if (!section) return null
  return section.themes.find(theme => theme.id === themeId) || null
}

// Função para obter história por ID
export function getStoryById(storyId, themeId, gender) {
  const theme = getThemeByIdAndGender(themeId, gender)
  if (!theme || !theme.stories) return null
  return theme.stories.find(story => story.id === storyId) || null
}

// Função de compatibilidade para código antigo
export function getThemeById(themeId) {
  // Procura em ambas as seções
  for (const gender of ['menino', 'menina']) {
    const theme = getThemeByIdAndGender(themeId, gender)
    if (theme) return theme
  }
  return null
}

// Exportação de compatibilidade
export const themes = [
  ...genderSections.menino.themes,
  ...genderSections.menina.themes
]



// Funções de compatibilidade para código antigo
export function getStoriesByTheme(themeId) {
  const theme = getThemeById(themeId)
  return theme?.stories || []
}

export function isThemeAdaptable(themeId) {
  const theme = getThemeById(themeId)
  return theme?.adaptable || false
}

export function getStoryVersion(storyId, gender) {
  // Para temas adaptáveis, retorna versão específica do gênero
  for (const genderKey of ['menino', 'menina']) {
    const section = getGenderSection(genderKey)
    if (!section) continue
    
    for (const theme of section.themes) {
      if (theme.stories) {
        const story = theme.stories.find(s => s.id === storyId)
        if (story && gender === genderKey) {
          return story
        }
      }
    }
  }
  return null
}

