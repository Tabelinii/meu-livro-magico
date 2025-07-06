export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Meu Perfil
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Usuário
            </h2>
            
            <p className="text-gray-600 mb-8">
              Gerencie suas informações e preferências
            </p>
            
            <div className="space-y-4">
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

