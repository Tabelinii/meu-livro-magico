import { useState, useRef } from 'react'
import { Upload, Camera, X, Check } from 'lucide-react'

export default function PhotoUpload({ onPhotoSelect, selectedPhoto }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file) => {
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    // Validar tamanho (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 10MB.')
      return
    }

    setUploading(true)

    try {
      // Converter para base64 para preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoData = {
          file: file,
          preview: e.target.result,
          name: file.name,
          size: file.size
        }
        onPhotoSelect(photoData)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Erro ao processar imagem:', error)
      alert('Erro ao processar a imagem. Tente novamente.')
      setUploading(false)
    }
  }

  const removePhoto = () => {
    onPhotoSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (selectedPhoto) {
    return (
      <div className="relative">
        <div className="bg-white rounded-lg border-2 border-green-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span className="font-medium">Foto selecionada</span>
            </div>
            <button
              onClick={removePhoto}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <img
              src={selectedPhoto.preview}
              alt="Foto da criança"
              className="w-20 h-20 object-cover rounded-lg border-2 border-green-200"
            />
            <div>
              <p className="font-medium text-gray-800">{selectedPhoto.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedPhoto.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-purple-400 bg-purple-50'
            : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="space-y-4">
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-purple-600 font-medium mt-2">Processando foto...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="bg-purple-100 rounded-full p-4">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Faça upload da foto da criança
                </h3>
                <p className="text-gray-600 mb-4">
                  Arraste e solte uma foto aqui ou clique para selecionar
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Selecionar Foto
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Formatos aceitos: JPG, PNG, WEBP</p>
                <p>Tamanho máximo: 10MB</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">i</span>
            </div>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">
              Dicas para melhores resultados:
            </h4>
            <ul className="mt-1 text-sm text-blue-700 list-disc list-inside space-y-1">
              <li>Use uma foto com o rosto bem visível</li>
              <li>Prefira fotos com boa iluminação</li>
              <li>Evite fotos muito escuras ou borradas</li>
              <li>O rosto deve ocupar boa parte da imagem</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

