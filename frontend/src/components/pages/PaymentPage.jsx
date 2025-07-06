import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  
  const { selectedTheme, selectedStory, childData, personalizedTitle } = location.state || {}

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simular processamento de pagamento
    setTimeout(() => {
      setLoading(false)
      // Redirecionar para página de sucesso
      navigate('/sucesso', {
        state: { personalizedTitle, childData }
      })
    }, 3000)
  }

  if (!personalizedTitle || !childData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sessão expirada</h2>
          <button 
            onClick={() => navigate('/criar')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Criar Novo Livrinho
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600">
            Você está quase lá! Complete o pagamento para receber seu livrinho.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Resumo do Pedido */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
            
            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold text-lg">{personalizedTitle}</h3>
              <p className="text-gray-600 text-sm mt-1">
                Livrinho personalizado para {childData.name}, {childData.age} anos
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Livrinho Digital (PDF)</span>
                <span>R$ 29,90</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Entrega instantânea</span>
                <span>Grátis</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-purple-600">R$ 29,90</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Você receberá:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• PDF em alta qualidade para impressão</li>
                <li>• 15 páginas com ilustrações profissionais</li>
                <li>• História personalizada com o nome da criança</li>
                <li>• Entrega instantânea por email</li>
                <li>• Garantia de 30 dias</li>
              </ul>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Dados de Pagamento</h2>
            
            <form onSubmit={handlePayment}>
              
              {/* Método de Pagamento */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Método de Pagamento</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      paymentMethod === 'credit' 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    💳 Cartão de Crédito
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 border-2 rounded-lg text-center transition-colors ${
                      paymentMethod === 'pix' 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    📱 PIX
                  </button>
                </div>
              </div>

              {/* Dados Pessoais */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Dados Pessoais</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              {/* Dados do Cartão (se cartão selecionado) */}
              {paymentMethod === 'credit' && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Dados do Cartão</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Número do Cartão *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit'}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Validade *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required={paymentMethod === 'credit'}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required={paymentMethod === 'credit'}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="123"
                          maxLength="4"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome no Cartão *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required={paymentMethod === 'credit'}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Nome como está no cartão"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PIX */}
              {paymentMethod === 'pix' && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-800">💡 Pagamento via PIX</h3>
                  <p className="text-sm text-blue-700">
                    Após clicar em "Finalizar Compra", você receberá o código PIX para pagamento. 
                    O livrinho será enviado automaticamente após a confirmação do pagamento.
                  </p>
                </div>
              )}

              {/* Botão de Pagamento */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  `${paymentMethod === 'pix' ? '📱 Gerar PIX' : '💳 Finalizar Compra'} - R$ 29,90`
                )}
              </button>

              {/* Segurança */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Pagamento 100% seguro • SSL criptografado • Dados protegidos
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Garantias */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4 text-center">Nossas Garantias</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold mb-1">Garantia de 30 dias</h4>
              <p className="text-sm text-gray-600">Não ficou satisfeito? Devolvemos seu dinheiro</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold mb-1">Entrega Instantânea</h4>
              <p className="text-sm text-gray-600">Receba seu livrinho em segundos por email</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-semibold mb-1">Qualidade Premium</h4>
              <p className="text-sm text-gray-600">Ilustrações profissionais em alta resolução</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

