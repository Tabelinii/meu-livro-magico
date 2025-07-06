export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Meu Livro Mágico</h3>
            <p className="text-purple-200">
              Transformando fotos em livros mágicos personalizados para crianças.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-white">Como Funciona</a></li>
              <li><a href="#" className="hover:text-white">Temas Disponíveis</a></li>
              <li><a href="#" className="hover:text-white">Suporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <p className="text-purple-200">
              contato@meulivromagico.com.br
            </p>
          </div>
        </div>
        
        <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200">
          <p>&copy; 2024 Meu Livro Mágico. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

