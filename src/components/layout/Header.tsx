'use client'
import { useState } from 'react'
import Modal from '../common/Modal'
import AddIngredientForm from '../ingredients/AddIngredientForm'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 w-full bg-white border-b shadow-sm">
        <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">푸리징</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            재료 추가
          </button>
        </nav>
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="새로운 식재료 추가"
      >
        <AddIngredientForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
} 