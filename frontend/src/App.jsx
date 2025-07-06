import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/pages/HomePage'
import CreateBookPage from './components/pages/CreateBookPage'
import PreviewPage from './components/pages/PreviewPage'
import MyBooksPage from './components/pages/MyBooksPage'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import PaymentPage from './components/pages/PaymentPage'
import SuccessPage from './components/pages/SuccessPage'
import GenerationPage from './components/pages/GenerationPage'
import DownloadPage from './components/pages/DownloadPage'
import StoryViewerPage from './components/pages/StoryViewerPage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [currentBook, setCurrentBook] = useState(null)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header user={user} setUser={setUser} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/criar" element={<CreateBookPage user={user} setCurrentBook={setCurrentBook} />} />
            <Route path="/historia/:storyId" element={<StoryViewerPage />} />
            <Route path="/gerar" element={<GenerationPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/preview" element={<PreviewPage currentBook={currentBook} user={user} />} />
            <Route path="/pagamento" element={<PaymentPage />} />
            <Route path="/sucesso" element={<SuccessPage />} />
            <Route path="/meus-livros" element={<MyBooksPage user={user} />} />
            <Route path="/perfil" element={<ProfilePage user={user} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

