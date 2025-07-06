import { useState, useEffect } from 'react'

export default function MagicTransformation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const steps = [
    { id: 'photo', label: 'Foto Real' },
    { id: 'magic', label: 'Magia da IA' },
    { id: 'book', label: 'Livro Personalizado' }
  ]

  useEffect(() => {
    setIsVisible(true)
    
    // Cycle through animation steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        Veja a magia acontecer
      </h3>
      
      <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl p-8 overflow-hidden">
        {/* Background magical elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating sparkles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}
          
          {/* Magic particles */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 animate-pulse"></div>
        </div>

        {/* Main transformation area */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Step 1: Real Photo */}
          <div className={`text-center transition-all duration-1000 ${
            currentStep === 0 ? 'scale-110 opacity-100' : 'scale-95 opacity-60'
          }`}>
            <div className="relative mb-4">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                  <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👶</span>
                  </div>
                </div>
              </div>
              
              {/* Photo frame effect */}
              <div className="absolute -inset-2 bg-white rounded-2xl -z-10 shadow-2xl"></div>
              
              {/* Magical glow when active */}
              {currentStep === 0 && (
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-30 animate-pulse -z-20"></div>
              )}
            </div>
            
            <h4 className="text-lg font-bold text-white mb-2">📸 Foto Real</h4>
            <p className="text-white/80 text-sm">Sua criança especial</p>
          </div>

          {/* Magic Arrow/Transformation */}
          <div className="text-center">
            <div className="relative">
              {/* Animated arrow */}
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500 ${
                  currentStep === 1 ? 'animate-pulse scale-110' : ''
                }`}></div>
                <div className="text-2xl animate-bounce">🪄</div>
                <div className={`w-8 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 transition-all duration-500 ${
                  currentStep === 1 ? 'animate-pulse scale-110' : ''
                }`}></div>
              </div>
              
              {/* Magic burst effect */}
              {currentStep === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-20 animate-ping"></div>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <h4 className="text-lg font-bold text-white mb-2">🤖 IA Mágica</h4>
              <p className="text-white/80 text-sm">Transformação inteligente</p>
            </div>
          </div>

          {/* Step 3: Personalized Book */}
          <div className={`text-center transition-all duration-1000 ${
            currentStep === 2 ? 'scale-110 opacity-100' : 'scale-95 opacity-60'
          }`}>
            <div className="relative mb-4">
              {/* Book */}
              <div className="w-32 h-40 mx-auto relative transform hover:scale-105 transition-transform">
                {/* Book cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-2xl transform rotate-3">
                  <div className="p-4 h-full flex flex-col justify-between">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-lg">👶</span>
                      </div>
                      <div className="text-white text-xs font-bold">MEU LIVRO</div>
                    </div>
                    <div className="text-white text-xs text-center">MÁGICO</div>
                  </div>
                </div>
                
                {/* Book pages */}
                <div className="absolute inset-0 bg-white rounded-lg shadow-xl transform -rotate-1 -z-10"></div>
                <div className="absolute inset-0 bg-gray-100 rounded-lg shadow-lg transform -rotate-2 -z-20"></div>
              </div>
              
              {/* Magical glow when active */}
              {currentStep === 2 && (
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl opacity-30 animate-pulse -z-30"></div>
              )}
            </div>
            
            <h4 className="text-lg font-bold text-white mb-2">📚 Livro Personalizado</h4>
            <p className="text-white/80 text-sm">História única criada</p>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentStep
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Transformation text */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">
              {currentStep === 0 && "Analisando foto..."}
              {currentStep === 1 && "Criando magia..."}
              {currentStep === 2 && "Livro pronto!"}
            </span>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-8 py-3 rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl">
            ✨ Criar Minha História Agora
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        
        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

