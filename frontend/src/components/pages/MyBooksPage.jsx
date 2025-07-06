import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyBooksPage({ user }) {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    // Simular carregamento de livros do usuário
    setTimeout(() => {
      const mockBooks = [
        {
          id: 1,
          title: 'Pedro e a Grande Aventura do Penico',
          theme: 'Desenvolvimento Infantil',
          childName: 'Pedro',
          childAge: 3,
          status: 'completed',
          createdAt: '2024-01-15',
          cover: '/images/covers/desfralde.png',
          downloadUrl: '#'
        },
        {
          id: 2,
          title: 'Ana e o Reino dos Sabores Mágicos',
          theme: 'Desenvolvimento Infantil',
          childName: 'Ana',
          childAge: 4,
          status: 'completed',
          createdAt: '2024-01-10',
          cover: '/images/covers/alimentacao.png',
          downloadUrl: '#'
        },
        {
          id: 3,
          title: 'Lucas, o Pequeno Super-Herói',
          theme: 'Super-Herói',
          childName: 'Lucas',
          childAge: 5,
          status: 'draft',
          createdAt: '2024-01-20',
          cover: '/images/covers/super_heroi_1.png',
          downloadUrl: null
        }
      ]
      setBooks(mockBooks)
      setLoading(false)
    }, 1500)
  }, [user, navigate])

  const handleDownload = (book) => {
    // Simular download
    const link = document.createElement('a')
    link.href = book.downloadUrl || '#'
    link.download = `${book.title.replace(/\s+/g, '_')}.pdf`
    link.click()
  }

  const handleContinueEditing = (book) => {
    navigate('/criar', {
      state: {
        editingBook: book,
        selectedTheme: book.theme.toLowerCase().replace(/\s+/g, '_'),
        childData: {
          name: book.childName,
          age: book.childAge
        }
      }
    })
  }

  const handleDeleteBook = (bookId) => {
    if (confirm('Tem certeza que deseja excluir este livrinho?')) {
      setBooks(books.filter(book => book.id !== bookId))
    }
  }

  if (!user) {
    return <div>Redirecionando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Meus Livrinhos
          </h1>
          <p className="text-xl text-gray-600">
            Olá, {user.name}! Aqui estão todas as suas histórias criadas.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {books.filter(b => b.status === 'completed').length}
            </div>
            <div className="text-gray-600">Livrinhos Completos</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {books.filter(b => b.status === 'draft').length}
            </div>
            <div className="text-gray-600">Rascunhos</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {books.length}
            </div>
            <div className="text-gray-600">Total de Livrinhos</div>
          </div>
        </div>

        {/* Botão Criar Novo */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/criar')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-colors shadow-lg"
          >
            ✨ Criar Novo Livrinho
          </button>
        </div>

        {/* Lista de Livros */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando seus livrinhos...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Nenhum livrinho ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Que tal criar sua primeira história personalizada?
            </p>
            <button
              onClick={() => navigate('/criar')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Criar Primeiro Livrinho
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                
                {/* Capa do Livro */}
                <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📖</span>
                    </div>
                    <h4 className="font-bold text-sm text-gray-800">
                      {book.title}
                    </h4>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    {book.status === 'completed' ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        ✅ Completo
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                        ✏️ Rascunho
                      </span>
                    )}
                  </div>
                </div>

                {/* Informações do Livro */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {book.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Criança:</span>
                      <span className="font-medium">{book.childName}, {book.childAge} anos</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tema:</span>
                      <span className="font-medium">{book.theme}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Criado em:</span>
                      <span className="font-medium">
                        {new Date(book.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="space-y-2">
                    {book.status === 'completed' ? (
                      <>
                        <button
                          onClick={() => handleDownload(book)}
                          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          📥 Baixar PDF
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => navigate('/preview', { 
                              state: { 
                                selectedTheme: book.theme.toLowerCase().replace(/\s+/g, '_'),
                                selectedStory: 'mock',
                                childData: { name: book.childName, age: book.childAge }
                              }
                            })}
                            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                          >
                            👁️ Visualizar
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleContinueEditing(book)}
                          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                          ✏️ Continuar Editando
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                          🗑️ Excluir Rascunho
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dicas */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">💡 Dicas para Aproveitar Melhor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🖨️ Impressão</h4>
              <p className="text-sm text-gray-600">
                Para melhor qualidade, imprima em papel couché 180g ou superior. 
                Configure a impressão para "Alta Qualidade" nas configurações.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📱 Compartilhamento</h4>
              <p className="text-sm text-gray-600">
                Compartilhe os PDFs com familiares via WhatsApp, email ou redes sociais. 
                Eles vão adorar ver a criança como protagonista!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎁 Presente Especial</h4>
              <p className="text-sm text-gray-600">
                Livrinhos personalizados são presentes únicos para aniversários, 
                Dia das Crianças ou qualquer ocasião especial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📚 Coleção</h4>
              <p className="text-sm text-gray-600">
                Crie uma coleção com diferentes temas para a mesma criança. 
                Cada história trabalha valores e aprendizados únicos.
              </p>
            </div>
          </div>
        </div>

        {/* Suporte */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Precisa de ajuda ou tem alguma dúvida?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              💬 Chat de Suporte
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              📧 Enviar Email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

