import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Mail, Lock, User, Phone } from 'lucide-react'

export default function LoginPage({ setUser }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular login
    setTimeout(() => {
      const user = {
        id: 1,
        name: loginData.email.split('@')[0],
        email: loginData.email,
        phone: '(11) 99999-9999',
        createdAt: new Date().toISOString()
      }
      
      setUser(user)
      setIsLoading(false)
      
      // Verificar se há livro pendente
      const pendingBook = localStorage.getItem('pendingBook')
      if (pendingBook && redirect === 'payment') {
        navigate('/payment')
      } else {
        navigate('/meus-livros')
      }
    }, 1500)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    setIsLoading(true)

    // Simular registro
    setTimeout(() => {
      const user = {
        id: 1,
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        createdAt: new Date().toISOString()
      }
      
      setUser(user)
      setIsLoading(false)
      
      // Verificar se há livro pendente
      const pendingBook = localStorage.getItem('pendingBook')
      if (pendingBook && redirect === 'payment') {
        navigate('/payment')
      } else {
        navigate('/meus-livros')
      }
    }, 1500)
  }

  const handleSocialLogin = (provider) => {
    setIsLoading(true)
    
    // Simular login social
    setTimeout(() => {
      const user = {
        id: 1,
        name: `Usuário ${provider}`,
        email: `usuario@${provider}.com`,
        phone: '(11) 99999-9999',
        createdAt: new Date().toISOString()
      }
      
      setUser(user)
      setIsLoading(false)
      
      const pendingBook = localStorage.getItem('pendingBook')
      if (pendingBook && redirect === 'payment') {
        navigate('/payment')
      } else {
        navigate('/meus-livros')
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="h-10 w-10 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">Meu Livrinho.IA</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {redirect === 'payment' ? 'Faça login para continuar' : 'Bem-vindo de volta!'}
          </h2>
          <p className="text-gray-600">
            {redirect === 'payment' 
              ? 'Entre na sua conta para finalizar a compra do seu livrinho'
              : 'Entre na sua conta ou crie uma nova para começar'
            }
          </p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Criar Conta</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">E-mail</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Sua senha"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({
                          ...prev,
                          password: e.target.value
                        }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
                    </label>
                    <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                      Esqueceu a senha?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Nome Completo</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={registerData.name}
                        onChange={(e) => setRegisterData(prev => ({
                          ...prev,
                          name: e.target.value
                        }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-email">E-mail</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-phone">Telefone</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-password">Senha</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={registerData.password}
                        onChange={(e) => setRegisterData(prev => ({
                          ...prev,
                          password: e.target.value
                        }))}
                        className="pl-10"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData(prev => ({
                          ...prev,
                          confirmPassword: e.target.value
                        }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1" required />
                    <span className="ml-2 text-sm text-gray-600">
                      Eu aceito os{' '}
                      <a href="#" className="text-purple-600 hover:text-purple-500">
                        Termos de Uso
                      </a>{' '}
                      e a{' '}
                      <a href="#" className="text-purple-600 hover:text-purple-500">
                        Política de Privacidade
                      </a>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Criando conta...' : 'Criar Conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg className="h-4 w-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="text-purple-600 hover:text-purple-500">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="text-purple-600 hover:text-purple-500">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  )
}

