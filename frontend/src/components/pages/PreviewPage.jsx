import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getThemeById, getStoriesByTheme } from '../../data/stories'

export default function PreviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  
  // Dados vindos da página anterior
  const { selectedTheme, selectedStory, childData } = location.state || {}
  
  useEffect(() => {
    // Se não tiver dados, redireciona para criar
    if (!selectedTheme || !selectedStory || !childData?.name) {
      navigate('/criar')
    }
  }, [selectedTheme, selectedStory, childData, navigate])

  if (!selectedTheme || !selectedStory || !childData?.name) {
    return <div>Carregando...</div>
  }

  const theme = getThemeById(selectedTheme)
  const stories = getStoriesByTheme(selectedTheme)
  const story = stories.find(s => s.id === selectedStory)
  const personalizedTitle = story?.personalizedTitle.replace('{nome}', childData.name) || ''

  // Páginas reais da história
  const pages = []
  
  if (story?.fullStory) {
    // Adiciona páginas da história real
    Object.keys(story.fullStory).forEach((pageKey, index) => {
      const pageData = story.fullStory[pageKey]
      pages.push({
        id: index,
        title: pageData.title.replace('{nome}', childData.name),
        content: pageData.text.replace('{nome}', childData.name).replace('{idade}', childData.age),
        illustration: pageData.illustration?.replace('{nome}', childData.name),
        isMainPage: index === 0
      })
    })
  } else {
    // Fallback para páginas mockadas
    pages.push(
      {
        id: 0,
        title: personalizedTitle,
        content: `Era uma vez ${childData.name}, uma criança muito especial de ${childData.age} anos...`,
        isMainPage: true
      },
      {
        id: 1,
        title: 'Página 2',
        content: `${childData.name} descobriu algo incrível...`,
        isMainPage: false
      },
      {
        id: 2,
        title: 'Página 3', 
        content: `A aventura de ${childData.name} continuou...`,
        isMainPage: false
      },
      {
        id: 3,
        title: 'Página 4',
        content: `E assim ${childData.name} aprendeu uma lição valiosa...`,
        isMainPage: false
      }
    )
  }

  const handlePurchase = () => {
    // Redirecionar para página de pagamento
    navigate('/pagamento', {
      state: { selectedTheme, selectedStory, childData, personalizedTitle }
    })
  }

  const handleEdit = () => {
    // Voltar para edição
    navigate('/criar', {
      state: { selectedTheme, selectedStory, childData }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Preview do Seu Livrinho
          </h1>
          <p className="text-xl text-gray-600">
            {personalizedTitle}
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              {theme?.name}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {story?.ageRange}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              15 páginas
            </span>
          </div>
        </div>

        {/* Preview Container - Estilo WonderWraps */}
        <div className="flex justify-center items-center mb-8">
          <div className="relative">
            
            {/* Páginas de fundo (borradas) */}
            <div className="absolute -left-4 -top-2 transform rotate-2">
              <div className="w-80 h-96 bg-white rounded-lg shadow-lg filter blur-sm opacity-60 border"></div>
            </div>
            <div className="absolute -right-4 -top-2 transform -rotate-2">
              <div className="w-80 h-96 bg-white rounded-lg shadow-lg filter blur-sm opacity-60 border"></div>
            </div>
            <div className="absolute -left-6 -top-4 transform rotate-3">
              <div className="w-80 h-96 bg-white rounded-lg shadow-lg filter blur-md opacity-40 border"></div>
            </div>
            <div className="absolute -right-6 -top-4 transform -rotate-3">
              <div className="w-80 h-96 bg-white rounded-lg shadow-lg filter blur-md opacity-40 border"></div>
            </div>

            {/* Página principal (em foco) */}
            <div className="relative z-10 w-80 h-96 bg-white rounded-lg shadow-2xl border-2 border-purple-200 overflow-hidden">
              <div className="h-full flex flex-col">
                
                {/* Área da imagem/ilustração */}
                <div className="h-2/3 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                  {currentPage === 0 ? (
                    // Capa principal com imagem real
                    <div className="w-full h-full relative">
                      {story?.cover ? (
                        <img 
                          src={story.cover} 
                          alt={personalizedTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback se imagem não carregar
                            e.target.style.display = 'none'
                            e.target.nextElementSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      {/* Fallback */}
                      <div className="absolute inset-0 flex items-center justify-center text-center p-6" style={{display: story?.cover ? 'none' : 'flex'}}>
                        <div>
                          <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">{theme?.icon}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {personalizedTitle}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Uma história especial para {childData.name}
                          </p>
                        </div>
                      </div>
                      {/* Overlay com título */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-bold text-sm">
                          {personalizedTitle}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    // Páginas internas
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📖</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Ilustração da página {currentPage + 1}
                      </p>
                    </div>
                  )}
                  
                  {/* Indicador de página */}
                  <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs">
                    {currentPage + 1}/15
                  </div>
                </div>

                {/* Área do texto */}
                <div className="h-1/3 p-4 bg-white">
                  <h4 className="font-bold text-sm mb-2">{pages[currentPage]?.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {pages[currentPage]?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação entre páginas */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            ← Anterior
          </button>
          
          <div className="flex gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPage ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
            disabled={currentPage === pages.length - 1}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            Próxima →
          </button>
        </div>

        {/* Informações do livro */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Detalhes do Livrinho</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">História Selecionada</h4>
              <p className="text-gray-600 mb-1">{story?.title}</p>
              <p className="text-sm text-gray-500">{story?.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Criança</h4>
              <p className="text-gray-600 mb-1">Nome: {childData.name}</p>
              <p className="text-gray-600 mb-1">Idade: {childData.age} anos</p>
              <p className="text-gray-600">Tema: {theme?.name}</p>
            </div>
          </div>
          
          {/* Valores pedagógicos */}
          {story?.values && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Valores Trabalhados</h4>
              <div className="flex flex-wrap gap-2">
                {story.values.map((value, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleEdit}
            className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition-colors"
          >
            ✏️ Editar Livrinho
          </button>
          <button 
            onClick={handlePurchase}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-colors shadow-lg"
          >
            💳 Comprar por R$ 29,90
          </button>
        </div>

        {/* Garantia */}
        <div className="text-center mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-700 font-medium">
            ✅ Garantia de 30 dias • 🚚 Entrega instantânea • 💯 Satisfação garantida
          </p>
        </div>
      </div>
    </div>
  )
}

