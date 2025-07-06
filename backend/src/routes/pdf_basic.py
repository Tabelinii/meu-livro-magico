from flask import Blueprint, request, jsonify, Response
import json

pdf_bp = Blueprint('pdf', __name__)

# Histórias disponíveis
STORIES = {
    "desfralde": {
        "title": "A Grande Aventura do Penico",
        "pages": [
            {
                "title": "Era uma vez...",
                "text": "Era uma vez {nome}, uma criança muito especial de {idade} anos, que estava prestes a viver a maior aventura de sua vida! No banheiro de casa, havia algo mágico esperando por {nome}: um penico dourado que brilhava com uma luz suave e acolhedora."
            },
            {
                "title": "O Penico Mágico",
                "text": "\"Olá, {nome}!\" disse o penico com uma voz gentil. \"Eu sou o Penico Mágico, e estou aqui para te ajudar a crescer!\" {nome} olhou para o Penico Mágico com curiosidade. Era diferente de tudo que já tinha visto!"
            },
            {
                "title": "A Primeira Conquista",
                "text": "{nome} respirou fundo e decidiu tentar. E quando conseguiu usar o penico pela primeira vez, uma chuva de estrelinhas douradas caiu do teto! \"Parabéns, {nome}! Você é muito corajoso!\" celebrou o Penico Mágico."
            },
            {
                "title": "Correndo para a Aventura",
                "text": "A partir daquele dia, sempre que {nome} sentia vontade, corria rapidinho para encontrar seu amigo Penico Mágico. \"Estou chegando!\" gritava {nome} alegremente, e o penico brilhava ainda mais forte."
            },
            {
                "title": "Sonhos Dourados",
                "text": "À noite, {nome} dormia tranquilo sabendo que o Penico Mágico estava sempre lá, cuidando e protegendo. Nos sonhos de {nome}, eles viviam aventuras incríveis juntos, voando por castelos dourados."
            },
            {
                "title": "A Grande Celebração",
                "text": "Depois de muitas aventuras e muito aprendizado, chegou o dia da grande celebração! {nome} tinha se tornado um verdadeiro expert em usar o penico, e toda a família estava reunida para comemorar."
            },
            {
                "title": "O Herói Crescido",
                "text": "{nome} olhou para o Penico Mágico e sorriu. Não era mais aquela criança pequenina que tinha medo. Agora {nome} era um verdadeiro herói, corajoso e independente!"
            },
            {
                "title": "Final Mágico",
                "text": "E assim, {nome} aprendeu que crescer é uma aventura mágica cheia de descobertas incríveis. O Penico Mágico sempre estaria lá, lembrando {nome} de que ser corajoso é o que nos faz crescer. {nome}, você é um verdadeiro herói!"
            }
        ]
    },
    "alimentacao": {
        "title": "O Reino dos Sabores Mágicos",
        "pages": [
            {
                "title": "A Cozinha Mágica",
                "text": "{nome}, de {idade} anos, estava explorando a cozinha quando algo incrível aconteceu! As frutas e vegetais começaram a falar e sorrir! \"Olá, {nome}!\" disse uma maçã vermelha brilhante. \"Bem-vindo ao Reino dos Sabores Mágicos!\""
            },
            {
                "title": "O Prato Arco-Íris",
                "text": "{nome} sentou-se à mesa e viu um prato muito especial: era um arco-íris de sabores! \"Cada cor tem uma magia diferente,\" explicou um brócolis verde. \"Eu te dou força para brincar!\" {nome} experimentou cada sabor e sentiu uma energia mágica crescendo."
            },
            {
                "title": "A Transformação Mágica",
                "text": "Depois de comer todos os alimentos mágicos, {nome} se sentiu incrível! Uma aura dourada brilhava ao redor de {nome}, que agora tinha energia para correr, pular e brincar o dia todo! \"Você descobriu o segredo!\" celebraram todos os alimentos."
            },
            {
                "title": "O Guardião dos Sabores",
                "text": "Os alimentos mágicos coroaram {nome} como o novo Guardião dos Sabores! \"Sua missão é espalhar a magia da alimentação saudável para outras crianças,\" disse a maçã real. {nome} aceitou a missão com um grande sorriso."
            },
            {
                "title": "Compartilhando a Magia",
                "text": "{nome} começou a compartilhar os segredos do Reino dos Sabores Mágicos com todos os amigos. \"Olhem como os alimentos ficam felizes quando os comemos!\" mostrava {nome}. E uma por uma, as outras crianças também descobriram a magia."
            },
            {
                "title": "Final Nutritivo",
                "text": "E assim, {nome} aprendeu que comer bem é a maior aventura de todas! Cada refeição se tornou uma festa no Reino dos Sabores Mágicos. {nome} cresceu forte, saudável e cheio de energia para todas as aventuras da vida. {nome}, você é um verdadeiro Guardião dos Sabores!"
            }
        ]
    },
    "super_heroi": {
        "title": "O Pequeno Super-Herói",
        "pages": [
            {
                "title": "A Descoberta",
                "text": "{nome}, de {idade} anos, estava brincando no quarto quando encontrou algo extraordinário! Uma capa vermelha brilhante flutuava no ar, cercada por estrelas douradas. \"Esta capa estava esperando por você, {nome}!\" disse uma voz mágica."
            },
            {
                "title": "Os Primeiros Poderes",
                "text": "Com a capa mágica, {nome} descobriu que tinha superpoderes incríveis! Podia voar pelo quarto, fazer os brinquedos dançarem e criar luzes coloridas com as mãos! \"Mas lembre-se,\" disse a voz sábia, \"o maior superpoder é a bondade do seu coração.\""
            },
            {
                "title": "A Primeira Missão",
                "text": "{nome} ouviu um miado triste vindo do jardim. Era um gatinho preso numa árvore alta! \"Esta é sua primeira missão, Super {nome}!\" disse a capa. Usando seus novos poderes, {nome} voou até a árvore e resgatou o gatinho com cuidado."
            },
            {
                "title": "Ajudando os Amigos",
                "text": "No parque, {nome} viu que alguns amigos estavam tristes porque perderam sua bola. \"Não se preocupem!\" disse Super {nome}. \"Eu vou ajudar vocês!\" Com seus superpoderes, {nome} encontrou a bola e ainda criou um arco-íris no céu."
            },
            {
                "title": "O Poder da Amizade",
                "text": "{nome} descobriu que quando ajudava os outros, eles também ganhavam superpoderes! Logo, todos os amigos tinham suas próprias capas mágicas e formaram a Liga dos Pequenos Heróis. \"Juntos somos mais fortes!\" disse {nome}."
            },
            {
                "title": "Final Heroico",
                "text": "E assim, {nome} se tornou o maior super-herói de todos os tempos! Não por ter superpoderes mágicos, mas por ter um coração bondoso e corajoso. Toda vez que {nome} ajudava alguém, o mundo ficava um pouquinho melhor. {nome}, você é um verdadeiro super-herói!"
            }
        ]
    }
}

@pdf_bp.route('/generate', methods=['POST'])
def generate_pdf():
    try:
        data = request.get_json()
        
        # Extrair dados
        child_name = data.get('childName', 'Criança')
        child_age = data.get('childAge', '3')
        story_id = data.get('storyId', 'desfralde')
        
        # Verificar se a história existe
        if story_id not in STORIES:
            return jsonify({'error': 'História não encontrada'}), 400
            
        story = STORIES[story_id]
        
        # Simular geração de PDF (retornar texto por enquanto)
        pdf_content = f"""
        {child_name} e {story['title']}
        
        Uma aventura mágica para {child_name}, {child_age} anos
        
        """
        
        for i, page in enumerate(story['pages']):
            personalized_text = page['text'].format(nome=child_name, idade=child_age)
            pdf_content += f"""
        Página {i+1}: {page['title']}
        
        {personalized_text}
        
        """
        
        pdf_content += f"""
        
        Parabéns!
        {child_name}, você completou sua aventura mágica!
        
        Criado com amor pelo Meu Livro Mágico
        """
        
        # Retornar como texto por enquanto (simulando PDF)
        return Response(
            pdf_content,
            mimetype='text/plain',
            headers={
                'Content-Disposition': f'attachment; filename="{child_name}_{story["title"].replace(" ", "_")}.txt"'
            }
        )
        
    except Exception as e:
        return jsonify({'error': f'Erro ao gerar PDF: {str(e)}'}), 500

@pdf_bp.route('/stories', methods=['GET'])
def get_stories():
    """Retorna lista de histórias disponíveis"""
    stories_list = []
    for story_id, story_data in STORIES.items():
        stories_list.append({
            'id': story_id,
            'title': story_data['title'],
            'pages': len(story_data['pages'])
        })
    
    return jsonify({'stories': stories_list})

@pdf_bp.route('/preview/<story_id>', methods=['POST'])
def preview_story():
    """Gera preview da história personalizada"""
    try:
        data = request.get_json()
        story_id = request.view_args['story_id']
        
        child_name = data.get('childName', 'Criança')
        child_age = data.get('childAge', '3')
        
        if story_id not in STORIES:
            return jsonify({'error': 'História não encontrada'}), 400
            
        story = STORIES[story_id]
        
        # Personalizar páginas
        personalized_pages = []
        for page in story['pages']:
            personalized_text = page['text'].format(nome=child_name, idade=child_age)
            personalized_pages.append({
                'title': page['title'],
                'text': personalized_text
            })
        
        return jsonify({
            'title': f"{child_name} e {story['title']}",
            'pages': personalized_pages
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao gerar preview: {str(e)}'}), 500

