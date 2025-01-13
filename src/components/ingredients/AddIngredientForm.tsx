'use client'
import { useState } from 'react'

interface AddIngredientFormProps {
  onClose: () => void
}

export default function AddIngredientForm({ onClose }: AddIngredientFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'VEGETABLE',
    expiryDate: '',
    quantity: 1,
    unit: 'PIECE',
    storageType: 'Refrigerated'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) throw new Error('등록 실패')
      
      onClose()
    } catch (error) {
      alert('식재료 등록에 실패했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">이름</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">카테고리</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full p-2 border rounded"
        >
          <option value="VEGETABLE">채소</option>
          <option value="FRUIT">과일</option>
          <option value="MEAT">육류</option>
          <option value="DAIRY">유제품</option>
          <option value="SEAFOOD">해산물</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">유통기한</label>
        <input
          type="date"
          value={formData.expiryDate}
          onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">수량</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">단위</label>
          <select
            value={formData.unit}
            onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
            className="w-full p-2 border rounded"
          >
            <option value="PIECE">개</option>
            <option value="GRAM">g</option>
            <option value="MILLILITER">ml</option>
            <option value="PACK">팩</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          추가하기
        </button>
      </div>
    </form>
  )
} 