import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)
  
  const { personalizedTitle, childData } = location.state || {}

  useEffect(() => {
    if (!personalizedTitle || !childData) {
      navigate('/')
      return
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/meus-livros')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [personalizedTitle, childData, navigate])

  const handleDownload = () => {
    // Simular download do PDF
    const link = document.createElement('a')
    link.href = '#' // Aqui seria a URL real do PDF gerado
    link.download = `${personalizedTitle.replace(/\s+/g, '_')}.pdf`
    link.click()
  }

  if (!personalizedTitle || !childData) {
    return <div>Redirecionando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Animação de Sucesso */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Parabéns! Compra Realizada com Sucesso!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            O livrinho "{personalizedTitle}" foi criado com sucesso!
          </p>
          
          <p className="text-lg text-gray-500">
            {childData.name} vai adorar sua nova aventura personalizada!
          </p>
        </div>

        {/* Informações do Pedido */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Detalhes do Seu Pedido</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="text-left">
              <h3 className="font-semibold text-gray-700 mb-2">Livrinho Criado:</h3>
              <p className="text-lg font-medium">{personalizedTitle}</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-700 mb-2">Criança:</h3>
              <p className="text-lg">{childData.name}, {childData.age} anos</p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
            <h3 className="font-semibold text-green-800 mb-3">📧 Email Enviado!</h3>
            <p className="text-green-700">
              Enviamos o seu livrinho em PDF para o email cadastrado. 
              Verifique sua caixa de entrada e spam.
            </p>
          </div>

          {/* Botão de Download */}
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-colors shadow-lg mb-4"
          >
            📥 Baixar Livrinho Agora
          </button>
          
          <p className="text-sm text-gray-500">
            Você também pode acessar seus livrinhos a qualquer momento na seção "Meus Livros"
          </p>
        </div>

        {/* Próximos Passos */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">O Que Fazer Agora?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖨️</span>
              </div>
              <h3 className="font-semibold mb-2">Imprima</h3>
              <p className="text-sm text-gray-600">
                Imprima em casa ou numa gráfica para ter o livro físico
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-semibold mb-2">Leia Junto</h3>
              <p className="text-sm text-gray-600">
                Compartilhe este momento especial lendo com {childData.name}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold mb-2">Compartilhe</h3>
              <p className="text-sm text-gray-600">
                Mostre para família e amigos a história personalizada
              </p>
            </div>
          </div>
        </div>

        {/* Criar Outro Livrinho */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Quer Criar Outro Livrinho?</h2>
          <p className="text-gray-600 mb-6">
            Que tal criar uma nova aventura para {childData.name} ou para outra criança especial?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/criar')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              ✨ Criar Novo Livrinho
            </button>
            <button
              onClick={() => navigate('/meus-livros')}
              className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              📚 Ver Meus Livros
            </button>
          </div>
        </div>

        {/* Avaliação */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Gostou da Experiência?</h2>
          <p className="text-gray-600 mb-6">
            Sua opinião é muito importante para nós! Deixe uma avaliação.
          </p>
          
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-3xl text-yellow-400 hover:text-yellow-500 transition-colors"
              >
                ⭐
              </button>
            ))}
          </div>
          
          <textarea
            placeholder="Conte-nos como foi sua experiência..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none"
            rows="3"
          ></textarea>
          
          <button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
            Enviar Avaliação
          </button>
        </div>

        {/* Redirecionamento Automático */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700">
            Redirecionando para "Meus Livros" em {countdown} segundos...
          </p>
          <button
            onClick={() => navigate('/meus-livros')}
            className="mt-2 text-blue-600 underline hover:text-blue-800"
          >
            Ir agora
          </button>
        </div>
      </div>
    </div>
  )
}

