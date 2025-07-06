import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generatePersonalizedBook, estimateBookCost } from '../../services/replicate'
import { getStoriesByTheme, getStoryVersion } from '../../data/stories'

export default function GenerationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [generationStatus, setGenerationStatus] = useState('preparing') // preparing, generating, completed, error
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [generatedPages, setGeneratedPages] = useState([])
  const [error, setError] = useState(null)
  const [estimatedCost, setEstimatedCost] = useState(null)
  const [generatedBook, setGeneratedBook] = useState(null)

  // Dados vindos da página anterior
  const { selectedTheme, selectedStory, selectedGender, childData, childPhoto } = location.state || {}

  useEffect(() => {
    // Se não tiver dados necessários, redireciona
    if (!selectedTheme || !selectedStory || !childData?.name || !childPhoto) {
      navigate('/criar')
      return
    }

    // Calcular custo estimado
    const stories = getStoriesByTheme(selectedTheme)
    const story = stories.find(s => s.id === selectedStory)
    if (story) {
      const cost = estimateBookCost(12) // 12 páginas padrão
      setEstimatedCost(cost)
    }

    // Iniciar geração automaticamente
    startGeneration()
  }, [selectedTheme, selectedStory, selectedGender, childData, childPhoto, navigate])

  const startGeneration = async () => {
    try {
      setGenerationStatus('generating')
      setCurrentStep('Preparando história personalizada...')
      setProgress(10)

      // Buscar dados da história com adaptação de gênero
      const storyData = getStoryVersion(selectedTheme, selectedStory, selectedGender)
      
      if (!storyData) {
        throw new Error('História não encontrada')
      }

      setCurrentStep('Personalizando história para ' + childData.name + '...')
      setProgress(25)

      // Simular personalização da história
      await new Promise(resolve => setTimeout(resolve, 2000))

      setCurrentStep('Gerando ilustrações com IA...')
      setProgress(40)

      // Gerar livro personalizado
      const bookData = await generatePersonalizedBook({
        theme: selectedTheme,
        story: selectedStory,
        gender: selectedGender,
        childName: childData.name,
        childAge: childData.age,
        childPhoto: childPhoto,
        storyData: storyData
      })

      setCurrentStep('Aplicando rosto da criança nas ilustrações...')
      setProgress(70)

      // Simular face swap
      await new Promise(resolve => setTimeout(resolve, 3000))

      setCurrentStep('Finalizando livro...')
      setProgress(90)

      // Simular finalização
      await new Promise(resolve => setTimeout(resolve, 1000))

      setGeneratedBook(bookData)
      setGenerationStatus('completed')
      setProgress(100)
      setCurrentStep('Livro gerado com sucesso!')

      // Redirecionar para página de download após 2 segundos
      setTimeout(() => {
        navigate('/download', {
          state: {
            generatedBook: bookData,
            childData,
            selectedTheme,
            selectedStory,
            selectedGender
          }
        })
      }, 2000)

    } catch (err) {
      console.error('Erro na geração:', err)
      setError(err.message)
      setGenerationStatus('error')
    }
  }

  const getStoryTitle = () => {
    if (!selectedTheme || !selectedStory || !childData?.name) return ''
    
    const storyData = getStoryVersion(selectedTheme, selectedStory, selectedGender)
    if (storyData?.title) {
      return storyData.title.replace('{nome}', childData.name)
    }
    
    return `${childData.name} e sua Aventura Mágica`
  }

  const getGenderText = () => {
    if (!selectedGender) return ''
    return selectedGender === 'menino' ? 'para meninos' : 'para meninas'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Criando Seu Livro Mágico
            </h1>
            <p className="text-gray-600 text-lg">
              Nossa IA está trabalhando para criar uma história única para {childData?.name}
            </p>
          </div>

          {/* Informações do livro */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Detalhes do Livro:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Título:</span>
                <p className="font-bold text-gray-800">{getStoryTitle()}</p>
              </div>
              <div>
                <span className="text-gray-600">Criança:</span>
                <p className="font-bold text-gray-800">{childData?.name}, {childData?.age} anos</p>
              </div>
              <div>
                <span className="text-gray-600">Tema:</span>
                <p className="font-bold text-gray-800">{selectedTheme?.replace('_', ' ')}</p>
              </div>
              {selectedGender && (
                <div>
                  <span className="text-gray-600">Adaptação:</span>
                  <p className="font-bold text-gray-800">História {getGenderText()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Status da geração */}
          <div className="space-y-6">
            {/* Barra de progresso */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso</span>
                <span className="text-sm font-medium text-gray-700">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Status atual */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full">
                {generationStatus === 'generating' && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                )}
                {generationStatus === 'completed' && (
                  <div className="text-green-600 text-2xl">✅</div>
                )}
                {generationStatus === 'error' && (
                  <div className="text-red-600 text-2xl">❌</div>
                )}
                <span className="font-medium text-gray-800">{currentStep}</span>
              </div>
            </div>

            {/* Custo estimado */}
            {estimatedCost && (
              <div className="text-center text-sm text-gray-600">
                Custo estimado: ${estimatedCost.toFixed(2)}
              </div>
            )}

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-800 mb-2">Erro na Geração</h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => navigate('/criar')}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            )}

            {/* Sucesso */}
            {generationStatus === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Livro Criado com Sucesso!
                </h3>
                <p className="text-green-700 mb-4">
                  Seu livro personalizado está pronto! Redirecionando para download...
                </p>
                <div className="animate-pulse text-green-600">
                  Preparando download...
                </div>
              </div>
            )}

            {/* Etapas do processo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              {[
                { step: 1, title: 'Personalização', desc: 'Adaptando história', completed: progress > 25 },
                { step: 2, title: 'Ilustrações', desc: 'Gerando imagens', completed: progress > 40 },
                { step: 3, title: 'Face Swap', desc: 'Aplicando rosto', completed: progress > 70 },
                { step: 4, title: 'Finalização', desc: 'Montando livro', completed: progress >= 100 }
              ].map((item) => (
                <div key={item.step} className={`text-center p-4 rounded-lg ${
                  item.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                    item.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {item.completed ? '✓' : item.step}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                  <p className="text-gray-600 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

