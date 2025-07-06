import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Download, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { pdfService } from '../../services/pdfService'

export default function DownloadPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)
  const [error, setError] = useState(null)
  const [bookData, setBookData] = useState(null)

  useEffect(() => {
    // Obter dados do livro do state
    if (location.state) {
      setBookData(location.state)
    } else {
      // Se não há dados, redirecionar para início
      navigate('/')
    }
  }, [location.state, navigate])

  const handleGeneratePDF = async () => {
    if (!bookData) return

    setIsGenerating(true)
    setError(null)

    try {
      // Preparar dados para o backend
      const pdfData = {
        childName: bookData.childData?.name || 'Criança',
        childAge: bookData.childData?.age || '3',
        storyId: getStoryId(bookData.selectedStory?.id),
        childPhoto: bookData.childPhoto || null
      }

      // Gerar PDF
      const pdfBlob = await pdfService.generatePDF(pdfData)
      
      // Fazer download
      const filename = `${pdfData.childName}_${bookData.selectedStory?.title?.replace(/\s+/g, '_') || 'Livro_Magico'}.pdf`
      pdfService.downloadPDF(pdfBlob, filename)
      
      setGenerationComplete(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const getStoryId = (storyId) => {
    // Mapear IDs das histórias para o backend
    const storyMap = {
      'desfralde': 'desfralde',
      'alimentacao': 'alimentacao',
      'super_heroi': 'super_heroi',
      'dormir': 'desfralde', // Fallback
      'compartilhar': 'alimentacao', // Fallback
      'ansiedade': 'super_heroi', // Fallback
    }
    return storyMap[storyId] || 'desfralde'
  }

  if (!bookData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Seu Livro Mágico Está Pronto!
          </h1>
          <p className="text-xl text-gray-600">
            {bookData.childData?.name}, sua aventura foi criada com sucesso!
          </p>
        </div>

        {/* Resumo do Livro */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Informações do Livro */}
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                📖 Detalhes do Livro
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700">Protagonista:</span>
                  <span className="text-gray-600">{bookData.childData?.name} ({bookData.childData?.age} anos)</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700">História:</span>
                  <span className="text-gray-600">{bookData.selectedStory?.title}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700">Tema:</span>
                  <span className="text-gray-600">{bookData.selectedTheme?.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-700">Páginas:</span>
                  <span className="text-gray-600">8 páginas ilustradas</span>
                </div>
              </div>
            </div>

            {/* Preview da Capa */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview da Capa</h3>
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg p-6 border-2 border-dashed border-purple-300">
                {bookData.childPhoto ? (
                  <img 
                    src={bookData.childPhoto} 
                    alt="Foto da criança"
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-purple-300 flex items-center justify-center">
                    <span className="text-2xl">👶</span>
                  </div>
                )}
                <h4 className="font-bold text-lg text-purple-800">
                  {bookData.childData?.name} e
                </h4>
                <p className="text-purple-600">
                  {bookData.selectedStory?.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            {!generationComplete && !isGenerating && (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Pronto para baixar seu livro?
                </h3>
                <p className="text-gray-600 mb-6">
                  Clique no botão abaixo para gerar e baixar o PDF do seu livro personalizado.
                </p>
                
                <button
                  onClick={handleGeneratePDF}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                >
                  <Download className="w-6 h-6" />
                  Gerar e Baixar PDF
                </button>
              </>
            )}

            {isGenerating && (
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Criando seu livro mágico...
                </h3>
                <p className="text-gray-600">
                  Estamos personalizando cada página especialmente para {bookData.childData?.name}!
                </p>
              </div>
            )}

            {generationComplete && (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Download Concluído!
                </h3>
                <p className="text-gray-600 mb-6">
                  Seu livro foi baixado com sucesso. Verifique sua pasta de downloads.
                </p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleGeneratePDF}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Baixar Novamente
                  </button>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Criar Outro Livro
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ops! Algo deu errado
                </h3>
                <p className="text-red-600 mb-6">
                  {error}
                </p>
                
                <button
                  onClick={handleGeneratePDF}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">
            💡 <strong>Dica:</strong> Imprima em papel de qualidade para uma experiência ainda mais mágica!
          </p>
          <p>
            📱 Compartilhe a alegria: tire fotos do {bookData.childData?.name} lendo seu livro personalizado!
          </p>
        </div>
      </div>
    </div>
  )
}

