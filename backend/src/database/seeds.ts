import { DataSource } from 'typeorm';
import { Story, StoryCategory, StoryGender } from '../stories/entities/story.entity';

export async function seedStories(dataSource: DataSource) {
  const storyRepository = dataSource.getRepository(Story);

  // Verificar se já existem histórias
  const existingStories = await storyRepository.count();
  if (existingStories > 0) {
    console.log('Histórias já existem no banco de dados');
    return;
  }

  console.log('Criando histórias iniciais...');

  const stories = [
    // Desenvolvimento Infantil
    {
      slug: 'grande-aventura-penico',
      title: 'A Grande Aventura do Penico',
      description: 'Uma aventura mágica sobre o desfralde',
      category: StoryCategory.DESENVOLVIMENTO_INFANTIL,
      gender: StoryGender.UNISSEX,
      ageRange: '2-4 anos',
      pages: [
        {
          title: 'Era uma vez...',
          text: 'Era uma vez {nome}, uma criança muito especial de {idade} anos, que estava prestes a viver a maior aventura de sua vida! No banheiro de casa, havia algo mágico esperando por {nome}: um penico dourado que brilhava com uma luz suave e acolhedora.',
          imagePrompt: 'Disney Pixar style, magical golden potty glowing softly in a colorful bathroom, child-friendly environment'
        },
        {
          title: 'O Penico Mágico',
          text: '"Olá, {nome}!" disse o penico com uma voz gentil. "Eu sou o Penico Mágico, e estou aqui para te ajudar a crescer!" {nome} olhou para o Penico Mágico com curiosidade. Era diferente de tudo que já tinha visto!',
          imagePrompt: 'Disney Pixar style, talking magical golden potty with friendly face, sparkles around it, warm lighting'
        },
        {
          title: 'A Primeira Conquista',
          text: '{nome} respirou fundo e decidiu tentar. E quando conseguiu usar o penico pela primeira vez, uma chuva de estrelinhas douradas caiu do teto! "Parabéns, {nome}! Você é muito corajoso!" celebrou o Penico Mágico.',
          imagePrompt: 'Disney Pixar style, golden stars falling from ceiling, celebration scene, magical atmosphere'
        },
        {
          title: 'Correndo para a Aventura',
          text: 'A partir daquele dia, sempre que {nome} sentia vontade, corria rapidinho para encontrar seu amigo Penico Mágico. "Estou chegando!" gritava {nome} alegremente, e o penico brilhava ainda mais forte.',
          imagePrompt: 'Disney Pixar style, child running happily towards glowing magical potty, dynamic movement, joyful scene'
        },
        {
          title: 'Sonhos Dourados',
          text: 'À noite, {nome} dormia tranquilo sabendo que o Penico Mágico estava sempre lá, cuidando e protegendo. Nos sonhos de {nome}, eles viviam aventuras incríveis juntos, voando por castelos dourados.',
          imagePrompt: 'Disney Pixar style, dream sequence with child and magical potty flying over golden castles, dreamy clouds'
        },
        {
          title: 'A Grande Celebração',
          text: 'Depois de muitas aventuras e muito aprendizado, chegou o dia da grande celebração! {nome} tinha se tornado um verdadeiro expert em usar o penico, e toda a família estava reunida para comemorar.',
          imagePrompt: 'Disney Pixar style, family celebration scene, colorful decorations, everyone happy and proud'
        },
        {
          title: 'O Herói Crescido',
          text: '{nome} olhou para o Penico Mágico e sorriu. Não era mais aquela criança pequenina que tinha medo. Agora {nome} era um verdadeiro herói, corajoso e independente!',
          imagePrompt: 'Disney Pixar style, confident child standing proudly next to magical potty, heroic pose, growth symbolism'
        },
        {
          title: 'Final Mágico',
          text: 'E assim, {nome} aprendeu que crescer é uma aventura mágica cheia de descobertas incríveis. O Penico Mágico sempre estaria lá, lembrando {nome} de que ser corajoso é o que nos faz crescer. {nome}, você é um verdadeiro herói!',
          imagePrompt: 'Disney Pixar style, magical ending scene with rainbow, child and potty surrounded by sparkles, triumphant moment'
        }
      ],
      isActive: true,
      isFeatured: true,
    },

    // Super-Herói para Meninos
    {
      slug: 'despertar-dos-poderes',
      title: 'O Despertar dos Poderes',
      description: 'Uma aventura épica sobre descobrir superpoderes e responsabilidade',
      category: StoryCategory.SUPER_HEROI,
      gender: StoryGender.MENINO,
      ageRange: '4-8 anos',
      pages: [
        {
          title: 'A Descoberta',
          text: '{nome}, de {idade} anos, estava brincando no quarto quando encontrou algo extraordinário! Uma capa vermelha brilhante flutuava no ar, cercada por estrelas douradas. "Esta capa estava esperando por você, {nome}!" disse uma voz mágica.',
          imagePrompt: 'Disney Pixar style, young boy discovering floating red superhero cape with golden stars, magical bedroom scene'
        },
        {
          title: 'Os Primeiros Poderes',
          text: 'Com a capa mágica, {nome} descobriu que tinha superpoderes incríveis! Podia voar pelo quarto, fazer os brinquedos dançarem e criar luzes coloridas com as mãos! "Mas lembre-se," disse a voz sábia, "o maior superpoder é a bondade do seu coração."',
          imagePrompt: 'Disney Pixar style, boy with red cape flying in room, toys dancing around, colorful lights from hands'
        },
        {
          title: 'A Primeira Missão',
          text: '{nome} ouviu um miado triste vindo do jardim. Era um gatinho preso numa árvore alta! "Esta é sua primeira missão, Super {nome}!" disse a capa. Usando seus novos poderes, {nome} voou até a árvore e resgatou o gatinho com cuidado.',
          imagePrompt: 'Disney Pixar style, superhero boy flying to rescue kitten from tall tree, heroic action scene'
        },
        {
          title: 'Ajudando os Amigos',
          text: 'No parque, {nome} viu que alguns amigos estavam tristes porque perderam sua bola. "Não se preocupem!" disse Super {nome}. "Eu vou ajudar vocês!" Com seus superpoderes, {nome} encontrou a bola e ainda criou um arco-íris no céu.',
          imagePrompt: 'Disney Pixar style, superhero boy helping friends find ball, rainbow in sky, happy children in park'
        },
        {
          title: 'O Poder da Amizade',
          text: '{nome} descobriu que quando ajudava os outros, eles também ganhavam superpoderes! Logo, todos os amigos tinham suas próprias capas mágicas e formaram a Liga dos Pequenos Heróis. "Juntos somos mais fortes!" disse {nome}.',
          imagePrompt: 'Disney Pixar style, group of children with colorful superhero capes, team pose, friendship and unity'
        },
        {
          title: 'Final Heroico',
          text: 'E assim, {nome} se tornou o maior super-herói de todos os tempos! Não por ter superpoderes mágicos, mas por ter um coração bondoso e corajoso. Toda vez que {nome} ajudava alguém, o mundo ficava um pouquinho melhor. {nome}, você é um verdadeiro super-herói!',
          imagePrompt: 'Disney Pixar style, heroic boy with cape standing proudly, city background, inspiring superhero moment'
        }
      ],
      isActive: true,
      isFeatured: true,
    },

    // Princesa para Meninas
    {
      slug: 'princesa-corajosa',
      title: 'A Princesa Corajosa',
      description: 'Uma aventura sobre coragem, bondade e liderança',
      category: StoryCategory.PRINCESA,
      gender: StoryGender.MENINA,
      ageRange: '4-8 anos',
      pages: [
        {
          title: 'O Reino Encantado',
          text: 'Em um reino muito distante, vivia a Princesa {nome}, de {idade} anos. Ela não era uma princesa comum - além de usar vestidos lindos, {nome} era conhecida por sua coragem e bondade. Seu castelo ficava no topo de uma montanha cercada por flores mágicas.',
          imagePrompt: 'Disney Pixar style, beautiful princess in pink dress, magical castle on mountain, colorful flowers everywhere'
        },
        {
          title: 'A Missão Especial',
          text: 'Um dia, a Fada Madrinha apareceu para {nome} com uma missão muito importante: "Princesa {nome}, o Reino das Cores perdeu toda sua magia! Apenas uma princesa corajosa como você pode ajudar a restaurar a alegria do reino."',
          imagePrompt: 'Disney Pixar style, fairy godmother talking to young princess, magical sparkles, important mission scene'
        },
        {
          title: 'A Jornada Começa',
          text: 'Princesa {nome} não hesitou nem um segundo! Ela pegou sua varinha mágica, montou em seu unicórnio cor-de-rosa e partiu para a grande aventura. "Vamos salvar o Reino das Cores!" disse {nome} com determinação.',
          imagePrompt: 'Disney Pixar style, brave princess riding pink unicorn, magical wand, starting epic journey'
        },
        {
          title: 'Espalhando Alegria',
          text: 'Durante sua jornada, {nome} encontrou muitas criaturas tristes que haviam perdido suas cores. Com sua bondade e magia, ela devolveu as cores a cada uma delas. Borboletas voltaram a ser coloridas, flores recuperaram seus tons vibrantes!',
          imagePrompt: 'Disney Pixar style, princess using magic to restore colors to butterflies and flowers, transformation scene'
        },
        {
          title: 'A Vitória da Bondade',
          text: 'Quando chegou ao Reino das Cores, {nome} descobriu que a magia só poderia ser restaurada com um ato de pura bondade. Ela compartilhou sua própria luz interior com todo o reino, e as cores voltaram mais brilhantes que nunca!',
          imagePrompt: 'Disney Pixar style, princess sharing magical light from her heart, kingdom becoming colorful again, triumph of kindness'
        },
        {
          title: 'Princesa Verdadeira',
          text: 'E assim, Princesa {nome} provou que ser uma verdadeira princesa não é sobre vestidos bonitos ou coroas brilhantes, mas sobre ter um coração corajoso e bondoso. {nome}, você é uma princesa de verdade!',
          imagePrompt: 'Disney Pixar style, confident princess with crown, surrounded by grateful kingdom creatures, true royalty'
        }
      ],
      isActive: true,
      isFeatured: true,
    }
  ];

  for (const storyData of stories) {
    const story = storyRepository.create(storyData);
    await storyRepository.save(story);
    console.log(`História criada: ${story.title}`);
  }

  console.log('Histórias iniciais criadas com sucesso!');
}

