import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <header className="bg-white shadow-lg border-b-4 border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-purple-800">Meu Livro Mágico</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/criar" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Criar Livrinho
            </Link>
            {user && (
              <Link 
                to="/meus-livros" 
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Meus Livros
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/perfil">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/criar" 
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Criar Livrinho
              </Link>
              {user && (
                <Link 
                  to="/meus-livros" 
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meus Livros
                </Link>
              )}
              <div className="border-t pt-4">
                {user ? (
                  <div className="space-y-2">
                    <Link 
                      to="/perfil"
                      className="block px-3 py-2 text-gray-700 hover:text-purple-600 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Perfil
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 rounded-md text-base font-medium"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    className="block px-3 py-2 text-purple-600 hover:text-purple-700 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

