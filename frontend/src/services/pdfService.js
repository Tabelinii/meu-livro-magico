// Serviço para geração de PDF
const PDF_API_BASE = '/api/pdf'

export const pdfService = {
  // Gerar PDF personalizado
  async generatePDF(bookData) {
    try {
      const response = await fetch(`${PDF_API_BASE}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      // Retornar blob para download
      const blob = await response.blob()
      return blob
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      throw error
    }
  },

  // Obter lista de histórias disponíveis
  async getAvailableStories() {
    try {
      const response = await fetch(`${PDF_API_BASE}/stories`)
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()
      return data.stories
    } catch (error) {
      console.error('Erro ao buscar histórias:', error)
      throw error
    }
  },

  // Gerar preview da história personalizada
  async generatePreview(storyId, childData) {
    try {
      const response = await fetch(`${PDF_API_BASE}/preview/${storyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(childData)
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Erro ao gerar preview:', error)
      throw error
    }
  },

  // Fazer download do PDF
  downloadPDF(blob, filename) {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

