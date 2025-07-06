import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { genderSections } from '../../data/stories'

export default function CreateBookPage({ user, setCurrentBook }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(1)
  const [selectedTheme, setSelectedTheme] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedStory, setSelectedStory] = useState('')
  const [childData, setChildData] = useState({
    name: '',
    age: '',
    interests: ''
  })
  const [childPhoto, setChildPhoto] = useState(null)

  // Extrair parâmetros da URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const theme = params.get('tema')  // Mudança: usar 'tema' em português
    const gender = params.get('genero')  // Mudança: usar 'genero' em português
    
    if (theme) {
      setSelectedTheme(theme)
    }
    if (gender) {
      setSelectedGender(gender)
    }
  }, [location])

  const currentThemeData = selectedTheme && selectedGender ? 
    genderSections[selectedGender]?.themes?.find(theme => theme.id === selectedTheme) : null

  const handleStorySelect = (storyId) => {
    setSelectedStory(storyId)
  }

  const handleNext = () => {
    if (step === 1 && selectedStory) {
      setStep(2)
    } else if (step === 2 && childData.name && childData.age) {
      setStep(3)
    } else if (step === 3 && childPhoto) {
      // Navegar para página de geração com todos os dados
      navigate('/gerar', {
        state: {
          selectedTheme,
          selectedStory,
          selectedGender,
          childData,
          childPhoto
        }
      })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigate('/')
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {currentThemeData ? `Escolha sua história de ${currentThemeData.title}` : 'Escolha sua História'}
              </h2>
              <p className="text-gray-600">
                {currentThemeData ? 
                  `Selecione uma das histórias do tema ${currentThemeData.title}` : 
                  'Selecione a história que mais combina com você'
                }
              </p>
            </div>

            {currentThemeData && currentThemeData.stories && (
              <div>
                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentThemeData.stories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => handleStorySelect(story.id)}
                      className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                        selectedStory === story.id ? 'ring-4 ring-blue-500' : ''
                      }`}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${story.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '300px'
                      }}
                    >
                      {/* Checkmark */}
                      {selectedStory === story.id && (
                        <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}

                      {/* Conteúdo */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                        <p className="text-white/90 mb-4">{story.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="text-white/80 text-sm block">
                              {story.ageRange} • {story.pages} páginas
                            </span>
                          </div>
                          <div className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedStory === story.id 
                              ? 'bg-blue-500 text-white' 
                              : selectedGender === 'menino' 
                                ? 'bg-blue-500/80 text-white group-hover:bg-blue-500' 
                                : 'bg-pink-500/80 text-white group-hover:bg-pink-500'
                          }`}>
                            {selectedStory === story.id ? 'Selecionada' : 'Selecionar'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!currentThemeData && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Nenhum tema selecionado
                </h3>
                <p className="text-gray-500 mb-6">
                  Volte à página inicial para escolher um tema
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Escolher Tema
                </button>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Informações da Criança
              </h2>
              <p className="text-gray-600">
                Conte-nos sobre a criança para personalizar a história
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da criança *
                </label>
                <input
                  type="text"
                  value={childData.name}
                  onChange={(e) => setChildData({...childData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o nome da criança"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idade *
                </label>
                <select
                  value={childData.age}
                  onChange={(e) => setChildData({...childData, age: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione a idade</option>
                  <option value="2">2 anos</option>
                  <option value="3">3 anos</option>
                  <option value="4">4 anos</option>
                  <option value="5">5 anos</option>
                  <option value="6">6 anos</option>
                  <option value="7">7 anos</option>
                  <option value="8">8 anos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interesses (opcional)
                </label>
                <textarea
                  value={childData.interests}
                  onChange={(e) => setChildData({...childData, interests: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Ex: gosta de dinossauros, ama brincar no parque..."
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Foto da Criança
              </h2>
              <p className="text-gray-600">
                Envie uma foto clara do rosto da criança para personalizar as ilustrações
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                {childPhoto ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(childPhoto)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                    <p className="text-sm text-gray-600">Foto selecionada: {childPhoto.name}</p>
                    <button
                      onClick={() => setChildPhoto(null)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remover foto
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-6xl">📸</div>
                    <div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Clique para enviar uma foto
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG até 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setChildPhoto(e.target.files[0])}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
                    >
                      Escolher Foto
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Dicas para melhor resultado:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use uma foto com boa iluminação</li>
                  <li>• O rosto deve estar bem visível</li>
                  <li>• Evite óculos ou objetos no rosto</li>
                  <li>• Prefira fotos recentes</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header com progresso */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Criar Meu Livro Mágico</h1>
            <div className="text-sm text-gray-600">
              Etapa {step} de 3
            </div>
          </div>

          {/* Indicador de progresso */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Labels das etapas */}
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Escolher História</span>
            <span>Dados da Criança</span>
            <span>Foto</span>
          </div>

          {/* Títulos das etapas */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {['Escolher História', 'Informações', 'Foto'].map((title, index) => (
              <div key={index} className={`text-center ${
                step === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-400'
              }`}>
                {title}
              </div>
            ))}
          </div>

          {/* Números das etapas */}
          <div className="flex justify-between items-center mt-6">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                  step >= stepNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-12">
        {renderStepContent()}

        {/* Botões de navegação */}
        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Voltar</span>
          </button>

          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !selectedStory) ||
              (step === 2 && (!childData.name || !childData.age)) ||
              (step === 3 && !childPhoto)
            }
            className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all ${
              (step === 1 && selectedStory) ||
              (step === 2 && childData.name && childData.age) ||
              (step === 3 && childPhoto)
                ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{step === 3 ? 'Criar Livro' : 'Próximo'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}

