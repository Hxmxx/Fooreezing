'use client'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Modal from '../common/Modal'
import AddIngredientForm from '../ingredients/AddIngredientForm'
import CameraCapture from '../ingredients/CameraCapture'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any[]>([])
  const queryClient = useQueryClient()

  const handleCapture = async (imageData: string, results: any[]) => {
    setAnalysisResults(results)
    setIsCameraOpen(false)
    setIsModalOpen(true)
  }

  return (
    <>
      <header className="fixed top-0 w-full bg-white border-b shadow-sm">
        <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">푸리징</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsCameraOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              카메라
            </button>
            <button 
              onClick={() => {
                setAnalysisResults([])
                setIsModalOpen(true)
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              직접 추가
            </button>
          </div>
        </nav>
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="새로운 식재료 추가"
      >
        <AddIngredientForm 
          onClose={() => setIsModalOpen(false)} 
          suggestedName={analysisResults[0]?.name}
        />
      </Modal>

      {isCameraOpen && (
        <CameraCapture 
          onCapture={handleCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </>
  )
} 