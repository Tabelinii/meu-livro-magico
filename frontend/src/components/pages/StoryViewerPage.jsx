import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { historiaDespertarDosPoderes } from '../../data/historia_super_heroi'

export default function StoryViewerPage() {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const [childName, setChildName] = useState('')
  const [isNameSet, setIsNameSet] = useState(false)

  // Para este exemplo, vamos usar a história do super-herói
  const story = historiaDespertarDosPoderes

  useEffect(() => {
    if (!story) {
      navigate('/')
    }
  }, [story, navigate])

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (childName.trim()) {
      setIsNameSet(true)
    }
  }

  const nextPage = () => {
    if (currentPage < story.paginas.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  if (!story) {
    return <div>História não encontrada</div>
  }

  if (!isNameSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Qual é o nome do pequeno herói?
          </h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Digite o nome da criança"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Começar a Aventura!
            </button>
          </form>
        </div>
      </div>
    )
  }

  const currentPageData = story.paginas[currentPage]
  const personalizedText = currentPageData.texto.replace(/\[NOME DA CRIANÇA\]/g, childName)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Voltar
          </button>
          <h1 className="text-xl font-bold text-gray-800">{story.titulo}</h1>
          <div className="text-sm text-gray-600">
            Página {currentPage + 1} de {story.paginas.length}
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white shadow-lg">
          <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
            {/* Image Side */}
            <div className="bg-gray-100 flex items-center justify-center p-8">
              <img
                src={currentPageData.imagem}
                alt={currentPageData.titulo}
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Text Side */}
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentPageData.titulo}
              </h2>
              {currentPageData.subtitulo && (
                <h3 className="text-lg text-gray-600 mb-6">
                  {currentPageData.subtitulo.replace(/\[NOME DA CRIANÇA\]/g, childName)}
                </h3>
              )}
              <div className="text-gray-700 leading-relaxed text-lg">
                {personalizedText.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-b-2xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === story.paginas.length - 1}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Próxima →
            </button>
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center space-x-2">
            {story.paginas.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPage
                    ? 'bg-blue-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

