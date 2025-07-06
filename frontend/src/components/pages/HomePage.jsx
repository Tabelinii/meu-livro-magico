import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { genderSections } from '../../data/stories'

export default function HomePage() {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    // Criar sparkles animados
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }))
    setSparkles(newSparkles)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 relative overflow-hidden">
      {/* Sparkles animados */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-white">Meu Livro Mágico</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white/90 hover:text-white transition-colors">Início</Link>
            <Link to="/criar" className="text-white/90 hover:text-white transition-colors">Criar Livrinho</Link>
            <Link to="/login" className="text-white/90 hover:text-white transition-colors">Entrar</Link>
          </nav>
          <button className="md:hidden bg-white/20 text-white px-4 py-2 rounded-lg">
            Entrar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-8">
            <span className="text-yellow-300 mr-2">✨</span>
            <span className="text-white text-sm font-medium">Powered by AI</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transforme suas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              fotos em livros mágicos
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            Crie histórias personalizadas únicas com inteligência artificial.
          </p>
          <p className="text-lg text-white/80 mb-12">
            Simples, rápido e mágico!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/criar"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span className="mr-2">✨</span>
              Criar Meu Livro Mágico
            </Link>
            <button className="inline-flex items-center bg-white/20 backdrop-blur-md text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
              Ver Demonstração
            </button>
          </div>

          {/* Vídeo cinematográfico */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-md border border-white/20">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                style={{ aspectRatio: '16/9' }}
              >
                <source src="/magic_transformation_video.mp4" type="video/mp4" />
                Seu navegador não suporta vídeo.
              </video>
              
              {/* Overlay com sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {sparkles.slice(0, 8).map(sparkle => (
                  <div
                    key={`video-${sparkle.id}`}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                    style={{
                      left: `${sparkle.x}%`,
                      top: `${sparkle.y}%`,
                      animationDelay: `${sparkle.delay}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-white mb-2">Veja a magia acontecer</h3>
              <p className="text-white/80">
                Transformação real: de uma simples foto para um livro personalizado único
              </p>
              <div className="inline-flex items-center bg-green-500/30 rounded-full px-4 py-2 mt-4">
                <span className="text-white font-medium">Processo 100% automatizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Temas com Layout do Site Antigo */}
      <section className="relative z-10 py-16 px-4 bg-white/5 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Escolha o Tema Perfeito
            </h2>
            <p className="text-white/80 text-xl">
              Cada tema foi criado especialmente para encantar e educar
            </p>
          </div>

          {/* Seção Meninos */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">👦</div>
              <h3 className="text-3xl font-bold text-white mb-2">Para Meninos</h3>
              <p className="text-white/80 text-lg">Aventuras épicas e histórias de coragem</p>
            </div>

            {/* Grid de temas para meninos - estilo site antigo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {genderSections.menino.themes.map((theme) => (
                <Link
                  key={theme.id}
                  to={`/criar?tema=${theme.id}&genero=menino`}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${theme.cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badges */}
                  {theme.isNew && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                      🌟NOVO!
                    </div>
                  )}
                  {theme.adaptable && (
                    <div className="absolute top-4 right-4 bg-green-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                      Adaptável
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl mb-3">{theme.emoji}</div>
                    <h4 className="text-2xl font-bold mb-2">{theme.title}</h4>
                    <p className="text-white/90 mb-4">{theme.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">
                        {theme.stories?.length || 1} história{(theme.stories?.length || 1) > 1 ? 's' : ''}
                      </span>
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-blue-400 transition-colors">
                        Escolher Tema
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Seção Meninas */}
          <div>
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">👧</div>
              <h3 className="text-3xl font-bold text-white mb-2">Para Meninas</h3>
              <p className="text-white/80 text-lg">Histórias mágicas e aventuras encantadoras</p>
            </div>

            {/* Grid de temas para meninas - estilo site antigo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {genderSections.menina.themes.map((theme) => (
                <Link
                  key={theme.id}
                  to={`/criar?tema=${theme.id}&genero=menina`}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${theme.cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badges */}
                  {theme.isNew && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                      🌟NOVO!
                    </div>
                  )}
                  {theme.adaptable && (
                    <div className="absolute top-4 right-4 bg-green-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                      Adaptável
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl mb-3">{theme.emoji}</div>
                    <h4 className="text-2xl font-bold mb-2">{theme.title}</h4>
                    <p className="text-white/90 mb-4">{theme.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">
                        {theme.stories?.length || 1} história{(theme.stories?.length || 1) > 1 ? 's' : ''}
                      </span>
                      <div className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-pink-400 transition-colors">
                        Escolher Tema
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para Criar Sua História?
            </h3>
            <p className="text-white/80 mb-8">
              Junte-se a milhares de famílias que já criaram memórias incríveis com nossos livrinhos personalizados.
            </p>
            <Link
              to="/criar"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">
            © 2024 Meu Livro Mágico. Transformando fotos em histórias inesquecíveis.
          </p>
        </div>
      </footer>
    </div>
  )
}

